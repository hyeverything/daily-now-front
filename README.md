# 🌳 Structure & Description

## Structure
```
+-- src
| 	+-- asset
	|	+-- img
|	+-- Components
	|	+-- Navigation.tsx
	|	+-- Stepper.tsx
|	+-- Interface
	|	+-- Admin.tsx
	|	+-- User.tsx
	|	+-- Board.tsx
	|	+-- FAQ.tsx
	|	+-- Error.tsx
|	+-- Pages
	|	+-- Admin
	|	|   +-- UserAdmin
	|	|   +-- CategoryAdmin
	|	|   +-- FaqAdmin
	|	|   +-- PointAdmin
	|	|   +-- P2PAdmin
	|	|   +-- BoardAdmin
	|	+-- Auth
	|	|   +-- Auth.tsx
	|	|   +-- FindPw.tsx
	|	|   +-- Registration.tsx
	|	+-- Board
	|	|   +-- Comment
	|	|   +-- Post
	|	|   +-- Search
	|	|   +-- Board.tsx
	|	|   +-- Category.tsx
	|	|   +-- NewPost.tsx
	|	+-- FAQ
	|	|   +-- Components
	|	|   |   +-- FAQItem.tsx
	|	|   +-- FAQ.tsx
	|	+-- Home
	|	|   +-- Profile
	|	|   |   +-- Funding
	|	|   |   |   +-- Accounts
	|	|   |   |   +-- P2P
	|	|   |   +-- Point
	|	|   |   +-- Share
	|	|   |   +-- Profile.tsx
	|	|   +-- Home.tsx
	|	+-- MyPage
	|	|   +-- MyPage.tsx
	|	+-- Randing
	|	|   +-- Randing.tsx
+-- App.tsx
+-- Router.tsx
+-- index.tsx
+-- react-app-env.d.ts
```

## Description

- **Components** : 재사용할 수 있는 컴포넌트 폴더

- **Interface**

  - Admin : 관리자 페이지 전용 인터페이스
  - User : 사용자의 정보 및 연동 회사, 연동 계좌, 투자, 포인트 정보 관련 인터페이스
  - Board : 게시판 카테고리, 게시글, 세부 게시글, 댓글 정보 관련 인터페이스
  - FAQ : FAQ 컴포넌트 인터페이스
  - Error : 에러 처리를 위한 인터페이스

- **Pages**

  - Admin : 사이트 관리를 위한 페이지

    - BoardAdmin / CategoryAdmin / FaqAdmin / P2PAdmin / PointAdmin / UserAdmin

  - Auth : 사용자 인증 처리를 위한 페이지

    - Auth : 로그인 기능
    - FindPw : 비밀번호 찾기 ( 재발급 기능 )
    - Registration : 회원가입 기능

  - Board : 투자자들의 소통을 위한 게시판 공간 제공 페이지

    - Board : 카테고리 별 게시판 컨테이너 및 내글 보기 페이지
    - Category : 카테고리 View 관리 페이지
    - NewPost : 새 글 CRUD 관리 페이지
    - Comment : 댓글 및 답글 CRUD 관리 페이지
      - Comment / CommentForm / CommentView

    - Post : 카테고리 별 전체 게시물 컨테이너
      - 정렬, 게시글 수 설정 가능
      - DetailPost : 세부 게시물 컴포넌트. 게시글, 댓글 및 답글 추천/비추천 기능
      - PostBox : 실제 전체 게시물 컴포넌트
    - Search : 카테고리, 검색범위, 검색어에 따른 게시물 검색 기능

  - FAQ : 자주 하는 질문을 모아 보여주는 페이지

    - 질답 확인 기능
    - FAQItem

  - Home : 사용자의 정보를 보여주는 페이지

    - Profile : 프로필 사진 변경 기능, 새로고침 기능, 로그아웃 기능
      - Funding : 투자 정보를 보여주는 탭
        - Accounts : 연동 회사 계정 수정 및 삭제 기능
        - P2P : 연동 회사 관리 및 잔고, 보유 계좌 조회 기능 
          - P2PList : 연동 회사 투자 정보 조회 기능
          - P2PRegister : 연동 회사 계정 등록 및 모아보기를 통한 계정 검색
      - Point : 포인트 정보를 보여주는 탭
        - 보유 포인트 조회 및 기간 별 포인트 상세 내역 조회 기능
        - PointList
      - Share : 친구 초대 기능을 제공하는 탭
        - 카카오톡 공유하기를 통한 친구 초대 기능

  - MyPage : 회원 탈퇴 및 비밀번호 변경 페이지

  - Randing : 서버 구동 시 첫 화면 랜딩 페이지


