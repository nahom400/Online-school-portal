# pdf_viewer/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import get_token, validate_token, get_all_scores, get_all_students, post_grades

# Create a router and register our viewset with it.
router = DefaultRouter()
# router.register(r'pdfs', PdfFileViewSet)

# The API URLs are now determined automatically by the router.


urlpatterns = [
    path('get_token/', get_token),
    path('validate_token/', validate_token),
    path('get_all_scores/', get_all_scores),
    path('get_all_students/', get_all_students),
    path('post_all/', post_grades)
]