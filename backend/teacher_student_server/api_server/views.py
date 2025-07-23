from django.views.generic import DayArchiveView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics, mixins
from rest_framework.decorators import api_view
from django.http import Http404

from .models import Mark, Teacher, Student
from .serializers import TeacherSerializer, StudentSerializer, MarkSerializer

class TeacherMarkListView(
	mixins.ListModelMixin,
	mixins.UpdateModelMixin,
	generics.GenericAPIView):
	serializer_class = MarkSerializer
	authentication_classes = [TokenAuthentication]
	permission_classes = [permissions.IsAuthenticated]

	def get(self, request, *args,**kwargs):
		username = self.kwargs['username']
		if self.request.user.username == username:
			return self.list(self, request, *args)
		else:
			raise Http404

	def put(self,request, *args,**kwargs):
		data = self.request.data
		print(data)
		for entry in data:
			'''##################################
				entry must look like 
			 {'student':<student_id>, 'subject':<subject_id>, 'mark':<integer> }
			##################################'''
			print(entry['subject'])
			markObj = Mark.objects.get(student=entry['student'], subject=entry['subject'])
			if markObj.mark != entry['mark']:
				markObj.mark = entry['mark']
				markObj.save()
				
		return Response(({'status':'done'}), status=200)

	def get_queryset(self):
		return Mark.objects.filter(subject__teacher__user__username=self.kwargs['username'])
				
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

class TeacherView(generics.RetrieveUpdateAPIView):
	serializer_class = TeacherSerializer
	lookup_field = 'user__username'

	authentication_classes = [TokenAuthentication]
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self, **kwargs):
		username = self.kwargs[self.lookup_field]
		if (self.request.user.username == username):
			return Teacher.objects.all()
		else:
			raise Http404
	

class StudentView(generics.RetrieveUpdateAPIView):
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

@api_view(["PUT"])
def perform_profile_update( self,request, *args, **kwargs):
	user = kwargs.get("user__username")
	print(user) 