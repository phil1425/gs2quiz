import re
questions = open('questions.txt','r')
result = open('myQuestions.txt','w')
question = ''
answerA = ''
answerB = ''
answerC  = ''
answerD = ''
ans = ''

result.write('var myQuestions = [\n')

l = questions.readline()

while True:
    if l[0] == 'I':
        n = l
        while True:
            l = questions.readline()
            if l[0] != '#':
                question += l
            else:
                break

    if l[0] == '#':
        answerA = l
        while True:
            l = questions.readline()
            if l[0] != '#':
                answerA += l
            else:
                break

    if l[0] == '#':
        answerB = l
        while True:
            l = questions.readline()
            if l[0] != '#':
                answerB += l
            else:
                break

    if l[0] == '#':
        answerC = l
        while True:
            l = questions.readline()
            if l[0] != '#':
                answerC += l
            else:
                break

    if l[0] == '#':
        answerD = l
        while True:
            l = questions.readline()
            if l[0] != 'I':
                answerD += l
            else:
                break

    name = re.sub('[^I1234567890]', '', n)
    answers = open('answers.txt','r')
    for line in answers:
        if name == re.sub('[^I1234567890]', '', line):
            ans = re.sub('[^abcd]', '', line)
            print ans
    answers.close()

    question = re.sub('[^ 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?]', '', question)
    answerA = re.sub('[^ 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?]', '', answerA)
    answerB = re.sub('[^ 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?]', '', answerB)
    answerC = re.sub('[^ 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?]', '', answerC)
    answerD = re.sub('[^ 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?]', '', answerD)
    n = re.sub('[^ 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?]', '', n)

    result.write('{\n')
    result.write('question: "'+question+'",\n')
    result.write('number: "'+n+'",\n')
    result.write('answers: {\n')
    result.write('a: "'+answerA[4:]+'",\n')
    result.write('b: "'+answerB[4:]+'",\n')
    result.write('c: "'+answerC[4:]+'",\n')
    result.write('d: "'+answerD[4:]+'"},\n')
    result.write('correctAnswers: {\n')
    if 'a' in ans:
        result.write('a: "null",\n')
    if 'b' in ans:
        result.write('b: "null",\n')
    if 'c' in ans:
        result.write('c: "null",\n')
    if 'd' in ans:
        result.write('d: "null",\n')
    result.write('}\n')
    result.write('},\n')

    question = ''

result.write('];')

questions.close()
result.close()
