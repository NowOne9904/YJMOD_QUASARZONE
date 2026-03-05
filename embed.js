/**
 * YJMOD 퀘이사존 견적 임베드 스크립트
 * 사용법: 퀘이사존 댓글 HTML 모드에서 아래 한 줄 붙여넣기
 * <script src="https://quasarzoneestimate.vercel.app/embed.js"></script>
 */
(function () {
  var url = 'https://quasarzoneestimate.vercel.app/quasarzone_estimate.html';
  var containerId = 'yjmod-embed-' + Date.now();

  // 현재 스크립트 태그 위치에 컨테이너 삽입
  var scripts = document.getElementsByTagName('script');
  var currentScript = scripts[scripts.length - 1];
  var container = document.createElement('div');
  container.id = containerId;
  container.style.cssText = 'width:100%;';
  currentScript.parentNode.insertBefore(container, currentScript.nextSibling);

  // quasarzone_estimate.html 내용 fetch 후 주입
  fetch(url)
    .then(function (res) { return res.text(); })
    .then(function (html) {
      // HTML 파일에서 <div> 본문만 추출 (퀘이사존 Bootstrap CSS 재활용)
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      // 최상위 wrapper div 찾기
      var body = doc.body;
      var wrapper = body.firstElementChild;
      if (wrapper) {
        container.innerHTML = wrapper.outerHTML;
      } else {
        container.innerHTML = html;
      }
    })
    .catch(function () {
      container.innerHTML = '<p style="color:#aaa;text-align:center;">견적을 불러올 수 없습니다. <a href="' + url + '" target="_blank">여기서 확인</a></p>';
    });
})();
