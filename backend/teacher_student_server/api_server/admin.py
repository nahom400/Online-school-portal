# pdf_viewer/admin.py
from django.contrib import admin
from .models import Student, Teacher
# this makes the admin editting feature up for the specific database
admin.site.register(Student)
admin.site.register(Teacher)