from operator import truediv

from django.db.models import QuerySet, query
from .models import Mark, Subject, Teacher, Student
from django.http import JsonResponse, Http404
from rest_framework import permissions, serializers, viewsets, response
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
import string
from .serializers import TeacherSerializer, StudentSerializer, MarkSerializer, SubjectSerializer

class TeacherMarkListView(generics.ListAPIView):
	serializer_class = MarkSerializer

	def get_queryset(self, **kwargs):
		username = self.kwargs['username']
		# t = Teacher.objects.filter(username=pk).first()
		# s = Subject.objects.filter(teacher=t).first()
		# subject = Subject.objects.filter(teacher = teacher)
		return Mark.objects.filter(subject__teacher__username=username)
				
class StudentMarkListView(generics.ListAPIView):
	serializer_class = MarkSerializer

	def get_queryset(self, **kwargs):
		username = self.kwargs['username']

		return Mark.objects.filter(student__username=username)

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
				try:
					if (teacher['password'] == credentials['password']):
						echo = teacher
						echo.pop('password')
						echo['role'] = "teacher"
						return JsonResponse({'echo':echo, 'error':None,})
				except:
					pass
				try:
					if (teacher['token'] == credentials['token']):
						echo = teacher
						echo.pop('password')
						echo.pop('token')
						echo['role'] = "teacher"
						return JsonResponse({'echo':echo, 'error':None,})
				except:
					pass
		return JsonResponse({'error':"Username and/or password is wrong!", 'token':None})

	if credentials['role'] == 'student':
		students = StudentSerializer(Student.objects.all(), many=True).data
		for student in students:
			if (student['username'] == credentials['username']):
				try:
					if (student['password'] == credentials['password']):
						echo = student
						echo.pop('password')
						echo['role'] = "student"
						return JsonResponse({'echo':echo, 'error':None,})
				except:
					pass
				try:
					if (student['token'] == credentials['token']):
						echo = student
						echo.pop('password')
						echo.pop('token')
						echo['role'] = "student"
						return JsonResponse({'echo':echo, 'error':None,})
				except:
					pass
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

@api_view(['GET'])
def get_all_students(request):
	req = request.GET
	if not (req['token'] and (req['username'] and req['role'])):
		return JsonResponse({'error':"you're required to input username, role and token"})
	# try:
	teacher = Teacher.objects.get(username=req['username'], token=req['token'])
	subjects = Subject.objects.filter(teacher=teacher)
	if subjects:
		meta_data = {'subjects': SubjectSerializer(subjects, many=True).data}
		entries_data = {}
		scores_data_list = [meta_data]
		del meta_data
		for subject in subjects:
			subject_filtered_marks = Mark.objects.filter(subject=subject)
			entries = MarkSerializer(subject_filtered_marks, many=True).data
			for entry in entries:
				student_name = entry['student_name']
				subject_name = entry['subject_name']
				entries_data[student_name+':'+subject_name]=entry['mark']

		scores_data_list.append(entries_data)
		return Response(scores_data_list)

	elif not subjects:
		return Response({'error':"No subjects found for teacher!"})

@api_view(['POST', "GET"])
def post_grades(request):
	changed_fields = request.GET
	print(changed_fields)
	for key in changed_fields.keys():
		firstname = key.split(':')[0].split(' ')[0]
		lastname = key.split(':')[0].split(' ')[1]
		subj_name = key.split(':')[1]
		student = Student.objects.filter(firstname=firstname, lastname=lastname).first()
		subject = Subject.objects.get(name=subj_name)
		mark = Mark.objects.get(student=student, subject=subject)
		mark.mark = float(changed_fields[key])
		mark.save()
	return Response({'success':f'changed {(changed_fields.keys)} entries'})
