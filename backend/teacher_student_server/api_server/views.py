from django.db.models import QuerySet, query
from .models import Mark, Subject, Teacher, Student
from django.http import JsonResponse, Http404
from rest_framework import permissions, serializers, viewsets, response
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
import string
from .serializers import TeacherSerializer, StudentSerializer, MarkSerializer, SubjectSerializer

class TeacherMarkListView(generics.ListAPIView):
	serializer_class = MarkSerializer
	
	authentication_classes = [TokenAuthentication]
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self, **kwargs):
		username = self.kwargs['username']
		if self.request.user.username == username:
			return Mark.objects.filter(subject__teacher__user__username=username)
		else:
			raise Http404
				
class StudentMarkListView(generics.ListAPIView):
	serializer_class = MarkSerializer
	
	authentication_classes = [TokenAuthentication]
	permission_classes = [permissions.IsAuthenticated]
	def get_queryset(self, **kwargs):
		username = self.kwargs['username']
		if self.request.user.username == username:
			return Mark.objects.filter(student__user__username=username)
		else:
			raise Http404

class TeacherView(generics.RetrieveAPIView):
	serializer_class = TeacherSerializer
	lookup_field = 'user__username'

	authentication_classes = [TokenAuthentication]
	permission_classes = [permissions.IsAuthenticated]
	
	def get_queryset(self, **kwargs):
		username = self.kwargs[self.lookup_field]
		if self.request.user.username == username:
			return Teacher.objects.all()
		else:
			raise Http404

class StudentView(generics.RetrieveAPIView):
	serializer_class = StudentSerializer
	lookup_field = 'user__username'

	authentication_classes = [TokenAuthentication]
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self, **kwargs):
		username = self.kwargs[self.lookup_field]
		if self.request.user.username == username:
			return Student.objects.all()
		else:
			raise Http404

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


# @api_view(['GET'])
# def get_all_scores(request):
# 	req = request.GET
# 	if not (req['token'] and (req['username'] and req['role'])):
# 		return JsonResponse({'error':"you're required to input username, role and token"})
# 	# try:
# 	student = Student.objects.get(username=req['username'], token=req['token'])
# 	scores_data = Mark.objects.filter(student=student)
# 	scores_serializer = MarkSerializer(scores_data, many=True)
# 	return Response(scores_serializer.data)

# @api_view(['GET'])
# def get_all_students(request):
# 	req = request.GET
# 	if not (req['token'] and (req['username'] and req['role'])):
# 		return JsonResponse({'error':"you're required to input username, role and token"})
# 	# try:
# 	teacher = Teacher.objects.get(username=req['username'], token=req['token'])
# 	subjects = Subject.objects.filter(teacher=teacher)
# 	if subjects:
# 		meta_data = {'subjects': SubjectSerializer(subjects, many=True).data}
# 		entries_data = {}
# 		scores_data_list = [meta_data]
# 		del meta_data
# 		for subject in subjects:
# 			subject_filtered_marks = Mark.objects.filter(subject=subject)
# 			entries = MarkSerializer(subject_filtered_marks, many=True).data
# 			for entry in entries:
# 				student_name = entry['student_name']
# 				subject_name = entry['subject_name']
# 				entries_data[student_name+':'+subject_name]=entry['mark']

# 		scores_data_list.append(entries_data)
# 		return Response(scores_data_list)

# 	elif not subjects:
# 		return Response({'error':"No subjects found for teacher!"})

# @api_view(['POST', "GET"])
# def post_grades(request):
# 	changed_fields = request.GET
# 	print(changed_fields)
# 	for key in changed_fields.keys():
# 		firstname = key.split(':')[0].split(' ')[0]
# 		lastname = key.split(':')[0].split(' ')[1]
# 		subj_name = key.split(':')[1]
# 		student = Student.objects.filter(firstname=firstname, lastname=lastname).first()
# 		subject = Subject.objects.get(name=subj_name)
# 		mark = Mark.objects.get(student=student, subject=subject)
# 		mark.mark = float(changed_fields[key])
# 		mark.save()
# 	return Response({'success':f'changed {(changed_fields.keys)} entries'})
