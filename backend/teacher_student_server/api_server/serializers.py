from rest_framework import serializers
from .models import Teacher, Student, Mark, Subject

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
    
    def to_representation(self, instance):
        return {
            'username':instance.user.username,
            'first_name':instance.user.first_name,
            'last_name':instance.user.last_name,
            'email':instance.user.email,
            'DOB':instance.date_of_birth,
            'nationality':instance.nationality,
            'address':instance.address,
            'role':'Student'
           }

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
    
    def to_representation(self, instance):
        return {
            'username':instance.user.username,
            'first_name':instance.user.first_name,
            'last_name':instance.user.last_name,
            'email':instance.user.email,
            'nationality':instance.nationality,
            'address':instance.address,
            'role':'Teacher'
           }

class MarkSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    subject_name = serializers.SerializerMethodField()
    grade_letter = serializers.SerializerMethodField()

    class Meta:
        model = Mark

        fields = ['student','student_name', 'subject','subject_name', 'mark', 'grade_letter', 'date_recorded' ]

    def get_student_name(self, obj):
        user = obj.student.user
        return str(f'{user.first_name} {user.last_name}')

    def get_subject_name(self, obj):
        return str(obj.subject)

    def get_grade_letter(self, obj):
        lowerGradeBounds = [90,80,70,60,50,40,30,0]
        gradeLetters = ['A','A-','B','C+','C-','D','F']
  
        score = float(obj.mark)
        for i in range(len(lowerGradeBounds)-1):
            if (score > lowerGradeBounds[i]):
                return (gradeLetters[i])

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['name', 'teacher']