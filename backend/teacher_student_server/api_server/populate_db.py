import random
import string
from datetime import date
from api_server.models import Teacher, Student, Subject, Mark
# creates 100 Marks (10 students, 10 subjects)
# may be less because of overlap probability ()

DUMMY_PASSWORD = '1234'
tokens = [
''.join(random.choices(string.ascii_letters+string.digits, k=16
	)) for _ in range(100)] 


first_names = ['Alice', 'Bob', 'Charlie','Loyd','Troy','Dennis','Selina','Sara','Jay', 'Joe', 'Freddy', 'David', 'James', 'Brown', 'Bob' , 'Daisy', 'Eve', 'Edward' ,'Kenway' ,'Frank', 'Grace', 'Hank', 'Ivy', 'Jake']
last_names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Martinez', 'Lee','Douglas', 'Grifith','Ludao', 'Edward', 'Kenway']
subjects_list = ['Math', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Art', 'Music', 'PE', 'Anthropology', 'Inclusive']


# Create teachers
teachers = [
    Teacher.objects.create(
        firstname=random.choice(first_names),
        username=random.choice(first_names),
        password=DUMMY_PASSWORD,
        token=random.choice(tokens),
        lastname=random.choice(last_names),
        email=f"teacher{i}@school.com"
    ) for i in range(7)
]

# Create subjects
subjects = [
    Subject.objects.create(
        name=subjects_list[i],
        teacher=random.choice(teachers)
    ) for i in range(12)
]

# Create students
students = [
    Student.objects.create(
        firstname=random.choice(first_names),
        lastname=random.choice(last_names),
        username=random.choice(first_names),
        password=DUMMY_PASSWORD,
        token=random.choice(tokens),
        email=f"student{i}@school.com",
        date_of_birth=date(2008 + i % 5, 1 + (i % 12), 1 + (i % 28))  # Dates between 2008–2012
    ) for i in range(40)
]

# Create marks (unique student-subject pairs)
created_pair = set()
while len(created_pair) < ((480)):
    student = random.choice(students)
    subject = random.choice(subjects)
    key = (student.id, subject.id)
    if key not in created_pair:
        Mark.objects.create(
            student=student,
            subject=subject,
            mark=round(random.randint(50, 100), 2)
        )
        created_pair.add(key)

print("✅ Seeded data without Faker.")
