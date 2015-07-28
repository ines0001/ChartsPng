var __DEBUG__ = true;
/*
 * Modification depuis Eclipse editor*
 */
function Mytesting(){
	
	Logger.log('testing')
}

function testing(){
  
  var option = {png:Graphique()};
  var c = Mailing('eremy@sqli.com',option);
  
  var i =0;

}

function doGet(request) {
  
  var html=null;
  
  html = HtmlService.createTemplateFromFile('board')
                        .evaluate()
                        .setTitle('Dashboard')
                        .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    
    
    
  return html;
}

function Graphique(){

var sampleData = Charts.newDataTable()
       .addColumn(Charts.ColumnType.STRING, "Month")
       .addColumn(Charts.ColumnType.NUMBER, "Dining")
       .addColumn(Charts.ColumnType.NUMBER, "Total")
       .addRow(["Jan", 60, 520])
       .addRow(["Feb", 50, 430])
       .addRow(["Mar", 53, 440])
       .addRow(["Apr", 70, 410])
       .addRow(["May", 80, 390])
       .addRow(["Jun", 60, 500])
       .addRow(["Jul", 100, 450])
       .addRow(["Aug", 140, 431])
       .addRow(["Sep", 75, 488])
       .addRow(["Oct", 70, 521])
       .addRow(["Nov", 58, 388])
       .addRow(["Dec", 63, 400])
       .build();
   
   var chart = Charts.newAreaChart()
       .setTitle('Yearly Spending')
       .setXAxisTitle('Month')
       .setYAxisTitle('Spending (USD)')
       .setDimensions(600, 500)
       .setStacked()
       .setColors(['red', 'green'])
       .setDataTable(sampleData)
       .build();

  return chart.getAs('image/png');

}

function Mailing(destinataire,option){
  if(__DEBUG__) {Logger.log('Mailing');Logger.log(destinataire);Logger.log(option);}
  if(destinataire===undefined || typeof option!='object') throw 'Mailing:no values for sendMailing';
  
  var html = HtmlService.createTemplateFromFile('Mail_template'),
      objet='',mail='';
  
  
  html.body_html= '%%body_mail%%';
  
  mail = '<p>Une demande de <b>Visa Forfait</b> pour le:<br></p>';
  mail+='<p align="center" style="font-size:1.2em;"><b>TEXTE</b></p>';
  mail+='<p>Une demande de création d\'arborescence.</p>';
  
  mail+= '<table border="0" cellpadding="0" cellspacing="0" style="text-align:center;margin-left:10%;float:left;background-color:#0099CC; border:1px solid #006699; border-radius:5px;">'
  mail+= '<tr>'
  mail+= '<td align="center" valign="middle" style="color:#FFFFFF; font-family:Helvetica, Arial, sans-serif; font-size:16px; font-weight:normal; letter-spacing:-.5px; line-height:150%; padding-top:15px; padding-right:30px; padding-bottom:15px; padding-left:30px;">'
  mail+= '<img src="cid:sqliLogo">';
  mail+= '</td>'
  
  mail+= '</tr>'
  mail+= '</table>'
  mail+= '<br style="clear:both;"><p ><small>Contacter le support si vous rencontrez des problèmes.</small></p>'
  
  var sqliLogoUrl = "http://www.sqli-enterprise.com/files/2014/05/logo_sqli_entreprise_340x156_bg_transp1.png";
   
  var sqliLogoBlob = UrlFetchApp
                          .fetch(sqliLogoUrl)
                          .getBlob()
                          .setName("sqliLogo");
  
  var advancedArgs = {htmlBody: html.evaluate()
                                    .getContent()
                                    .replace('%%body_mail%%',mail),
                      inlineImages:{
                                     sqliLogo: option.png
                                   },
                     
                     };
  
  objet = 'En objet';
  
  
  MailApp.sendEmail(destinataire, objet, '', advancedArgs);
  
  
  
  
  return true;
}
           
