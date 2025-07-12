from operator import truediv
from .models import Mark, Teacher, Student
from django.http import JsonResponse, Http404
from rest_framework import permissions, viewsets, response
from rest_framework.response import Response
from rest_framework.decorators import api_view
import string
from .serializers import TeacherSerializer, StudentSerializer, MarkSerializer

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
class MarkViewSet (viewsets.ModelViewSet):

    queryset = Mark.objects.all()
    serializer_class = MarkSerializer


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

@api_view(['GET'])
def get_token(request):
    credentials = request.GET

    if credentials['role'] == 'teacher':
        teachers = TeacherSerializer(Teacher.objects.all(), many=True).data
        for teacher in teachers:
            if (teacher['username'] == credentials['username']):
                if (teacher['password'] == credentials['password']):
                    echo = credentials.copy()
                    echo.pop('password')
                    return JsonResponse({'token':teacher['token'], 'error':None, 'echo':echo})
        return JsonResponse({'error':"Username and/or password is wrong!", 'token':None})

    if credentials['role'] == 'student':
        students = StudentSerializer(Student.objects.all(), many=True).data
        for student in students:
            if (student['username'] == credentials['username']):
                if (student['password'] == credentials['password']):
                    echo = credentials.copy()
                    echo.pop('password')
                    return JsonResponse({'token':student['token'], 'error':None, 'echo':echo})
        return JsonResponse({'error':"Username and/or password is wrong!", 'token':None, })
    return JsonResponse({"error":'nothing really worked', 'token':None})


@api_view(['GET'])
def get_all_scores(request):
    req = request.GET
    if not (req['token'] and (req['username'] and req['role'])):
        return JsonResponse({'error':"you're required to input username, role and token"})
    # try:
    student = Student.objects.get(username=req['username'], token=req['token'])
    scores_data = Mark.objects.filter(student=student)
    scores_serializer = MarkSerializer(scores_data, many=True)
    return Response(scores_serializer.data)
    # except:
        # return Response({'error':"Unauthorized; you'll need a valid username, role and token"})

