function memo() {
  const submit = document.getElementById("submit"); //ボタン情報(DOM)をsubmitにいれる
  submit.addEventListener("click", (e) => { //ボタンクリックされたら発動
    const formData = new FormData(document.getElementById("form")); //formからコントローラに送るためのFormDataオブジェクト=>formData
    const XHR = new XMLHttpRequest(); //
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData); //サーバーサイドにリクエストを送る
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post; //コントローラーの記述
      const list = document.getElementById("list"); //描画させる親要素のid
      const formText = document.getElementById("content"); //リセットさせるテキスト要素id
      const HTML = ` 
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`; // テンプレートリテリアルでHTML情報を代入
      list.insertAdjacentHTML("afterend", HTML); // 描画させるとこのどこ(4パターン)に入れるか指定
      formText.value = ""; //テキストリセット
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);
