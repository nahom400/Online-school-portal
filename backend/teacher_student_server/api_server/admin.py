# pdf_viewer/admin.py
from django.contrib import admin
from .models import Student, Teacher, Mark, Subject
# this makes the admin editting feature up for the specific database
admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(Subject)
admin.site.register(Mark)

