// HTML 요소 가져오기
const form = document.getElementById('searchForm');
const resultDiv = document.getElementById('result');

// 가짜 데이터베이스 (예시용)
const studentData = [
  { id: '20230001', name: '홍길동', email: 'hong123@school.edu', password: 'abc123' },
  { id: '20230002', name: '김철수', email: 'kimcs@school.edu', password: 'pass456' },
  { id: '20230003', name: '이영희', email: 'lee998@school.edu', password: 'pw7890' },
  { id: '20230004', name: '김민성', email: 'kimms@school.edu', password: 'pw7890' }
];

// URL에서 쿼리 파라미터 읽어서 input에 설정
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const idFromURL = params.get('studentId');
  const nameFromURL = params.get('studentName');

  if (idFromURL) document.getElementById('studentId').value = idFromURL;
  if (nameFromURL) document.getElementById('studentName').value = nameFromURL;

  // 자동 검색 실행 (필요 없다면 이 부분 주석처리)
  if (idFromURL && nameFromURL) {
    form.dispatchEvent(new Event('submit'));
  }
});

// 폼 제출 이벤트 처리
form.addEventListener('submit', function (e) {
  e.preventDefault(); // 폼 기본 동작 막기

  // 입력값 가져오기
  const studentId = document.getElementById('studentId').value.trim();
  const studentName = document.getElementById('studentName').value.trim();

  // 결과 초기화
  resultDiv.innerHTML = '';

  // 입력값 유효성 검사
  if (!studentId || !studentName) {
    resultDiv.textContent = '학번과 이름을 모두 입력해주세요.';
    return;
  }

  // 검색
  const student = studentData.find(s =>
    s.id === studentId && s.name === studentName
  );

  // 결과 출력
  if (student) {
    resultDiv.innerHTML = `
      <p>✅ <strong>${student.name}</strong> 님의 계정 정보</p>
      <p>📧 ID: <strong>${student.email}</strong></p>
      <p>🔒 PW: <strong>${student.password}</strong></p>
    `;
  } else {
    resultDiv.textContent = '해당하는 학생 정보를 찾을 수 없습니다.';
  }
});
