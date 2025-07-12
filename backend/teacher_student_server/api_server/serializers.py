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
    subject_name = serializers.SerializerMethodField()

    class Meta:
        model = Mark
        fields = ['student','subject_name','mark','date_recorded']

    def get_subject_name(self, obj):
        return str(obj.subject)



# the difference between ModelSerializer and HyperlinkedModelSerializer

# Notice that we're using hyperlinked relations in this case with HyperlinkedModelSerializer. You can also use primary key and various other relationships, but hyperlinking is good RESTful design.class 