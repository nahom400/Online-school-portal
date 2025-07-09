# pdf_viewer/admin.py
from django.contrib import admin
from .models import PdfFile, Blogs, Feedback

admin.site.register(PdfFile)
admin.site.register(Blogs)
admin.site.register(Feedback)

# this makes the admin editting feature up for the specific database