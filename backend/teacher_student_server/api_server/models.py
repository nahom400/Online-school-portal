# pdf_viewer/models.py
from django.db import models
from django.db.models.fields import related
from django.forms import CharField
from django.contrib.auth.models import User

TOKEN_DURATION = 72 #hours (3 days)
class Student(models.Model):

    # Student credentials data
    user = models.OneToOneField(to=User, null=True, on_delete=models.CASCADE)
    # Student identity information
    date_of_birth = models.DateField(null=True)
    # Semester-specific data
    #teachers_assigned_to = models.ListField()
    #subjects = models.DictField()

class Teacher(models.Model):

    # Teacher cmodels.redentials data
    user = models.OneToOneField(to=User, null=True, on_delete=models.CASCADE)

    # Teacher identity data
    #inbox = models.ListField()

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
    mark = models.FloatField()

    date_recorded = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'subject')


# class Grading(model.Model):