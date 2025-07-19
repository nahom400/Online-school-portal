# pdf_viewer/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import TeacherView, StudentView, TeacherMarkListView, StudentMarkListView
# Create a router and register our viewset with it.
router = DefaultRouter()
# router.register(r'pdfs', PdfFileViewSet)

# The API URLs are now determined automatically by the router.


urlpatterns = [
    path('get_token/', obtain_auth_token),
    path('Teacher/<str:user__username>/', TeacherView.as_view()),
    path('Student/<str:user__username>/', StudentView.as_view()),
    path('Marks/Teacher/<str:username>/', TeacherMarkListView.as_view()),
    path('Marks/Student/<str:username>/', StudentMarkListView.as_view()),
]