# Node.js 빌드 스테이지
FROM node:18 AS build

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사 및 의존성 설치
COPY ./frontend/package*.json ./
RUN echo "시작합니다"
RUN npm install && echo "Dependencies installed successfully"

# 소스 코드 복사 및 빌드 실행
COPY ./frontend .

# 빌드 실행 전 디버깅 - 파일 구조 확인
RUN ls -l /app

# 빌드 실행
RUN npm run build

# 빌드 후 결과물 확인
RUN ls -l /app/dist

# Production 스테이지로 Nginx 사용
FROM nginx:alpine

# 빌드된 정적 파일을 Nginx의 기본 경로로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 기본 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]