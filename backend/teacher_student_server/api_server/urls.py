# pdf_viewer/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import get_token, validate_token

# Create a router and register our viewset with it.
router = DefaultRouter()
# router.register(r'pdfs', PdfFileViewSet)

# The API URLs are now determined automatically by the router.


urlpatterns = [
    # path('hello/', hello_api),
    # path('pdfdb/<int:pk>/', serve_pdf_from_db),
    # path('get_book/<int:pk>/', get_book),
    # path('get_all_books/', get_all_books),
    # path('get_all_blogs/', get_all_blogs),
    path('get_token/', get_token),
    path('validate_token', validate_token)

]