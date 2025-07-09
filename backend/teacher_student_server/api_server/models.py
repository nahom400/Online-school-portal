# pdf_viewer/models.py
from django.db import models

class PdfFile(models.Model):
    # the class PdfFile( class_to_inherit )
    # the title is a character field with 200 maximum length
    # file is the blob i think; it is the pdf file itself
    # uploaded at is to hold the datetimefield
    # auto_now_add takes the time at its created time (sets itself at creation time)
    title = models.CharField(max_length=200)
    file = models.FileField(upload_to='pdfs/')
    description = models.TextField(blank=True, null=True)
    cover_image = models.ImageField(editable=True, upload_to='cover_image/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.title)

class Blogs(models.Model):
    # this will be shown on the homepage
    # it will have author, content(obviously), date created, date modified...
    title = models.CharField(max_length=200)
    author_name = models.CharField(max_length=50)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_posted = models.BooleanField(False)

    def __st__(self):
        return f"{self.title} -a post by {self.author_name} on time:{self.created_at}"

class Feedback(models.Model):
    # this will be attached to individual books
    # it will have the book id primarily to signify which book it is attached to, the user information, the comment text, rating given by user...
    user_data = models.CharField(max_length=50)
    text = models.TextField()
    commented_date = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField()

    def __st__(self):
        return f"{self.title} --a post by {self.author_name} on time:{self.created_at}"
