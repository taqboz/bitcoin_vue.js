var app = new Vue({
	el: '#app',
	data: {
		//bpiプロパティを空で定義
		bpi: null,
		//エラーハンドリング用のプロパティを定義
		hasError: false,
		
		loading: true
	},
	
	//インスタンスがマウントされたちょうど後に呼ばれる
	mounted: function() {
		//axiosを利用してcoindeskのjsonを取得
		axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
		.then(function(response){
			//console.log(response.data.bpi) //コンソールにjsonの内容を表示（デバック用）
			//変数bpiにcoindeskのbpiデータを代入
			this.bpi = response.data.bpi
		//dataのbpiプロパティにアクセスできるようにバインディング
		}.bind(this))
		
		//通信エラー時の処理
		.catch(function(error){
			console.log(error)
			this.hasError = true
		//dataのhasErrorプロパティにアクセスできるようにバインディング
		}.bind(this))
		
		//通信に関する全ての処理が終わったときに呼ばれる
		.finally(function(){
			this.loading = false
		}.bind(this))
	},
	
	//小数点以下の桁数の調整
	filters: {
		currencyDecimal(value) {
			//小数点以下を2桁に変更
			return value.toFixed(2)
		}
	}
	
})