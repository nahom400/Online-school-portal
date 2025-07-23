from faker import Faker
import random
from api_server.models import Student, Teacher, Subject, Mark
from django.contrib.auth.models import User

fake = Faker()

print("Seeding database...")

NUM_TEACHERS = 7
NUM_SUBJECTS = 7
NUM_STUDENTS = 20
DUMMY_PASSWORD = "dummy1234"

# Clear existing data
Mark.objects.all().delete()
Subject.objects.all().delete()
Teacher.objects.all().delete()
Student.objects.all().delete()
User.objects.all().delete()

print("Generating users...")
users = []
for _ in range(NUM_STUDENTS+NUM_TEACHERS):
    u = User.objects.create(
        username=fake.unique.user_name(),
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        email=fake.unique.email()
        )
    u.set_password(DUMMY_PASSWORD)
    u.save()
    users.append(u)

print("Generating teachers...")
teachers = [

]
userid = 0
for _ in range(NUM_TEACHERS):
    t = Teacher.objects.create(
        user=users[userid],
        nationality = fake.country(),
        address = "Addis"
    )
    teachers.append(t)
    userid=userid+1

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
        user=users[userid],
        date_of_birth=fake.date_of_birth(),
        nationality = fake.country(),
        address = "Addis"
    )
    students.append(s)
    userid=userid+1

print("Generating marks...")
for student in students:
    for subject in subjects:
        Mark.objects.create(
            student=student,
            subject=subject,
            mark=round(random.randint(40, 100), 2)
        )

print("✅ Done seeding database.")
