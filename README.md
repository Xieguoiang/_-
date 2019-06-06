### visualization_components   //项目名称

            │  gulpfile.js             //开发生产环境代码压缩配置
            │  package-lock.json	// 依赖包json
            │  node_modules	     // 依赖目录
            ├─dist				//生产环境目录文件
            │  │  index.html         //主页面
            │  │  
            │  └─static			//css img js脚本资源文件夹
            │      ├─css        //css
            │      ├─img	       //img
            │      └─js		 //js
            ├─rev                //生产开发环境命名映射json
            │  ├─css		//css映射json文件
            │  │      rev-manifest.json
            │  │      
            │  ├─img       // img 映射json文件
            │  │      rev-manifest.json
            │  │      
            │  ├─javascript   //js copy 和 压缩映射json文件
            │  │      rev-manifest.json
            │          
            └─src			//开发目录文件
                ├─css 			//css样式文件夹
                │      index.css     //index页面的css样式文件
                │      main.css	     //公共css样式文件
                │      
                ├─html 			//html页面文件夹
                │      index.html		//index页面html文件
                │      
                ├─img			//img图片资源文件夹
                │      xxx.png      //各类icon&background...图片
            │      
                └─js				// js脚本文件夹
                        api.js         //api接口函数文件	
                        data.js		//开发测试数据
                        go.js         //gojs库压缩源代码文件
                        index.js      //index主页面的js脚本文件
                        jquery.js		//jqueryjs库压缩源代码文件
                        layout.js		// layout布局的js脚本文件
