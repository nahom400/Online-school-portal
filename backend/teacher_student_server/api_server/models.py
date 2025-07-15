# pdf_viewer/models.py
from enum import unique
from django.db import models
from django.db.models.fields import related
from django.forms import CharField

TOKEN_DURATION = 72 #hours (3 days)

class Student(models.Model):
    # Student credentials data
    username = models.CharField(max_length=20)
    password = models.CharField(null=True, max_length=30)
    token = models.CharField(null=True, max_length=30)

    # Student identity information
    firstname = models.CharField(max_length=20, null=True)
    lastname = models.CharField(max_length=20,null=True )
    email = models.EmailField(unique=True)    
    date_of_birth = models.DateField(null=True)
    # Semester-specific data
    #teachers_assigned_to = models.ListField()
    #subjects = models.DictField()

    def __str__(self):
        return f'{self.firstname} {self.lastname}'

class Teacher(models.Model):

    # Teacher cmodels.redentials data
    username = models.CharField(max_length=20, null=True)
    password = models.CharField(null=True, max_length=30)
    token = models.CharField(null=True, max_length=30)

    # Teacher identity data
    firstname = models.CharField(max_length=50, null=True)
    lastname = models.CharField(max_length=50, null=True)
    email = models.EmailField(unique=True)
    #inbox = models.ListField()

    def __str__(self):
        return f'{self.firstname} {self.lastname}'

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

    def __str__(self):
        return f'{self.student} - {self.subject}: {self.mark}'

def set_token(user_id):
    pass

# class Grading(model.Model):