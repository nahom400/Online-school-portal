from django.urls import include, path
from django.contrib import admin
from rest_framework import routers

from api_server import views


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('auth/', include('api_server.urls')),
    path("admin/", admin.site.urls)
]
