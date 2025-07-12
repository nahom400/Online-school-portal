from rest_framework import serializers
from .models import Teacher, Student, Mark
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['username','firstname','lastname','password','token']

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['username','firstname','lastname','password','token']

class MarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mark
        fields = ['student','subject','mark','date_recorded']




# the difference between ModelSerializer and HyperlinkedModelSerializer

# Notice that we're using hyperlinked relations in this case with HyperlinkedModelSerializer. You can also use primary key and various other relationships, but hyperlinking is good RESTful design.class 