import urllib.parse
import urllib.request

# 로그인 정보
data = urllib.parse.urlencode({
    'username': 'olleh2020@daum.net',
    'password': 'thwn1wks'
}).encode('utf-8')

login_url = 'https://my1.konami.net/ja/signin'

# 로그인 요청
request = urllib.request.Request(login_url, data=data)
with urllib.request.urlopen(request) as response:
    # 응답 확인
    if response.status == 200:
        print("로그인 성공!")
        # 이제 데이터를 요청할 때 인증 정보를 포함하여 요청합니다.
    else:
        print("로그인 실패...")
