from django.db import models
from django.db.models.fields import related
from django.forms import CharField
from django.contrib.auth.models import User

TOKEN_DURATION = 72
class Student(models.Model):
    user = models.OneToOneField(to=User, null=True, on_delete=models.CASCADE)
    date_of_birth = models.DateField(null=True)
    nationality = models.CharField(null=True)
    address = models.CharField(null=True)

class Teacher(models.Model):
    user = models.OneToOneField(to=User, null=True, on_delete=models.CASCADE)
    nationality = models.CharField(null=True)
    address = models.CharField(null=True)
    def get_id(self):
        return self.id

class Subject(models.Model):
    name = models.CharField(max_length=100)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='subjects')

    def __str__(self):
        return f'{self.name}'



class Mark(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='marks')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='marks')
    mark = models.FloatField(null=True)
    date_recorded = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'subject')