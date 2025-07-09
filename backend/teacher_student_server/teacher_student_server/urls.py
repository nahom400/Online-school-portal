from django.urls import path, include

urlpatterns = [
    path('', include('api_server.urls')),
]
