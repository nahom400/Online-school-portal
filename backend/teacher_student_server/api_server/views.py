from .models import Teacher, Student
from django.http import JsonResponse, Http404
from rest_framework import permissions, viewsets

from .serializers import TeacherSerializer, StudentSerializer
Users = [
    {
        "username":"abel",
        "password":"123",
        "token":"wi9039jd43d2",
        "token_refresh":"89dh378d3d3s3"
    },
    {
        "username":"sal",
        "password":"1234",
        "token":"4903if0u38f4",
        "token_refresh":"94q378fxwx7o43x"
    },
    {
        "username":"sami",
        "password":"12345",
        "token":"adh93hf43dd32",
        "token_refresh":"fihef893uew3"
    },
    {
        "username":"leoul",
        "password":"123456",
        "token":"fihef893uew3",
        "token_refresh":"wi9039jd43d2"
    },
    {
        "username":"nati",
        "password":"1234567",
        "token":"89dh378d3d3s3",
        "token_refresh":"adh93hf43dd32"
    },
]

class StudentViewSet(viewsets.ModelViewSet):
    """
    API
    This provides the concise better way to implement POST and GET at the same time!

    Both to  view and edit !
    it may be that we call something like 
    UserViewSet.create
    UserViewSet.read
    UserViewSet.update
    UserViewSet.delete

    in our python function definitions: to connect them to the url paths

    Edit: we actually have a submodule in rest_framework called router which handles every thing without us writing a single line of url!!!!

    if you want more control over the urls you can revert back to using regular clas based views, then writing the url confs explicitly

    we write the url rest_framework_routing to the main urls.py file instead of the app
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class TeacherViewSet(viewsets.ModelViewSet):

    """
    Same story here
    """
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

def validate_token(request):
    for user in Users:
        try:
            if user['username'] == request.GET.get('username'):
                if user['token'] == request.GET.get('token'):
                    return JsonResponse({
                        "valid":True,
                        "error": None
                        })
        except AttributeError:
            return JsonResponse({
                        "valid": False,
                        "error": "invalid input"
                        })

    return JsonResponse({
        "valid": False,
        "error": "Your token may have expired."
        })

def get_token(request):
    for user in Users:
        try:
            if user['username'] == request.GET.get('username'):
                if user['password'] == request.GET.get('password'):
                    token = user['token']
                    token_refresh = user['token_refresh']
                    return JsonResponse({
                        "token":token,
                        "token_refresh":token_refresh,
                        "error": None
                        })
        except AttributeError:
            return JsonResponse({
                        "error": "Please enter correct credentials"
                        })

    return JsonResponse({"error":'Recheck your username and password please!'})

