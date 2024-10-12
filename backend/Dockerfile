# node 버전
FROM node:18

# 컨테이너에서 작업할 디렉토리를 /app으로 설정
WORKDIR /app

# package.json과 package-lock.json을 복사하고 의존성 설치
COPY package*.json ./

RUN npm install

# 서버 시작 전 bcrypt를 재설치
RUN npm rebuild bcrypt --build-from-source

# 나머지 소스 코드(bin, src 포함)를 /app으로 복사
COPY . .

CMD ["npm","start"]

EXPOSE 5000