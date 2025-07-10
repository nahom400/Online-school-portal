# pdf_viewer/models.py
from django.db import models
from django.forms import CharField

TOKEN_DURATION = 72 #hours (3 days)

class Student(models.Model):
    # Student credentials data
    username = models.CharField(max_length=20)
    password = models.CharField()
    token = models.CharField()

    # Student identity information
    first_name = models.CharField(max_length=20, null=True)
    last_name = models.CharField(max_length=20,null=True )
    section = models.CharField(max_length=4, null=True)

    # Semester-specific data
    #teachers_assigned_to = models.ListField()
    #subjects = models.DictField()

class Teacher(models.Model):

    # Teacher cmodels.redentials data
    username = models.CharField(max_length=20, null=True)
    password = models.CharField(null=True)
    token = models.CharField(null=True)

    # Teacher identity data
    first_name = models.CharField(max_length=20, null=True)
    last_name = models.CharField(max_length=20, null=True)
    
    #inbox = models.ListField()

def set_token(user_id):
    pass