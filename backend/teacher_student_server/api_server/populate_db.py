from faker import Faker
import random
import hashlib
from api_server.models import Student, Teacher, Subject, Mark

fake = Faker()

def generate_token():
    return hashlib.sha256(fake.uuid4().encode()).hexdigest()[:30]

# Run the following code in django shell! I deletes all objects first.
print("Seeding database...")

NUM_TEACHERS = 7
NUM_SUBJECTS = 7
NUM_STUDENTS = 50
DUMMY_PASSWORD = 1234

# Clear existing data
Mark.objects.all().delete()
Subject.objects.all().delete()
Teacher.objects.all().delete()
Student.objects.all().delete()

print("Generating teachers...")
teachers = []
for _ in range(NUM_TEACHERS):
    t = Teacher.objects.create(
        username=fake.unique.user_name(),
        password=DUMMY_PASSWORD,
        token=generate_token(),
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        email=fake.unique.email()
    )
    teachers.append(t)

print("Generating subjects...")
subjects = []
i = 0
for _ in range(NUM_SUBJECTS):
    teacher = teachers[i]
    i = i+1
    s = Subject.objects.create(
        name=fake.unique.job()[:50],
        teacher=teacher
    )
    subjects.append(s)

print("Generating students...")
students = []
for _ in range(NUM_STUDENTS):
    s = Student.objects.create(
        username=fake.unique.user_name(),
        password=DUMMY_PASSWORD,
        token=generate_token(),
        firstname=fake.first_name(),
        lastname=fake.last_name(),
        email=fake.unique.email(),
        date_of_birth=fake.date_of_birth()
    )
    students.append(s)

print("Generating marks...")
for student in students:
    for subject in subjects:
        Mark.objects.create(
            student=student,
            subject=subject,
            mark=round(random.randint(40, 100), 2)
        )

print("✅ Done seeding database.")
