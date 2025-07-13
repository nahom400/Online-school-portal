from rest_framework import serializers
from .models import Teacher, Student, Mark, Subject
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['username','firstname','lastname','password','token']

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['username','firstname','lastname','password','token']

class MarkSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    subject_name = serializers.SerializerMethodField()
    grade_letter = serializers.SerializerMethodField()

    class Meta:
        model = Mark
        fields = ['student', 'student_name','subject_name','mark','grade_letter','date_recorded']

    def get_student_name(self, obj):
        return str(obj.student)

    def get_subject_name(self, obj):
        return str(obj.subject)

    def get_grade_letter(self, obj):
        lowerGradeBounds = [90,80,70,60,50,40]
        gradeLetters = ['A','A-','B','C+','C-','D','F']
         # less than 50 = F
         # less than 70 = D 
         # less than 80 = C
         # less than 90 = B
         # 90 or more = A
        score = float(obj.mark)
        for i in range(len(lowerGradeBounds)-1):
            if (score > lowerGradeBounds[i]):
                return (gradeLetters[i])
                
# the difference between ModelSerializer and HyperlinkedModelSerializer

# Notice that we're using hyperlinked relations in this case with HyperlinkedModelSerializer. You can also use primary key and various other relationships, but hyperlinking is good RESTful design.class 