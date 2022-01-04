import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { ConexionService } from './conexion.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { convertTypeAcquisitionFromJson } from 'typescript';

pdfMake.vfs = pdfFonts.pdfMake.vfs;



interface Reporte {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covid_analysis';
  csvRecords: any[] = [];
  header = true;
  etiquetas: any[] = [];
  checked = false;

  selectedValue: string;
  regresionSelected:string;
  archivo:any;

  selectX:string;
  selectY:string;
  selectYcomparar:string;
  predecir:string;
  columnaFiltrar:string;
  valorFiltrar:string;
  grado:string;

  titoloCarta:string;

  resultado:any;
  grafica:string="data:image/png;base64,";

  resultado2:any;
  grafica2:string="data:image/png;base64,";

  rmse:string;
  r2:string;
  formulaLineal:string;

  rmse2:string;
  r22:string;
  formulaLineal2:string;

  total:string;
  subtotal:string;
  porcentaje:string;
  promedio:string;


  foods: Reporte[] = [
    {value: '1', viewValue: '1. Tendencia de la infección por Covid-19 en un País'},
    {value: '2', viewValue: '2. Predicción de Infectados en un País.'},
    {value: '1', viewValue: '3. Indice de Progresión de la pandemia'},
    {value: '2', viewValue: '4. Predicción de mortalidad por COVID en un Departamento.'},
    {value: '2', viewValue: '5. Predicción de mortalidad por COVID en un País.'},
    {value: 'x', viewValue: '6. Análisis del número de muertes por coronavirus en un País'},
    {value: '1', viewValue: '7. Tendencia del número de infectados por día de un País'},
    {value: '2', viewValue: '8. Predicción de casos de un país para un año'},
    {value: '1', viewValue: '9. Tendencia de la vacunación de en un País'},
    {value: '3', viewValue: '10. Análisis Comparativo de Vacunación entre 2 países'},
    {value: '4', viewValue: '11. Porcentaje de hombres infectados por covid19 en un País desde el primer caso activo'},
    {value: '3', viewValue: '12. Análisis Comparativo entre 2 o más países o continentes'},
    {value: '5', viewValue: '13. Muertes promedio por casos confirmados y edad de COVID 19 en un País.'},
    {value: 'x', viewValue: '14. Muertes según regiones de un país - COVID 19.'},
    {value: '1', viewValue: '15. Tendencia de casos confirmados de Coronavirus en un departamento de un País.'},
    {value: '4', viewValue: '16. Porcentaje de muertes frente al total de casos en un país, región o continente.'},
    {value: '6', viewValue: '17. Tasa de comportamiento de casos activos en relación con el número de muertes en un continente'},
    {value: 'x', viewValue: '18. Comportamiento y clasificación de personas infectadas por COVID-19 por municipio en un País'},
    {value: 'x', viewValue: '19. Predicción de muertes en el último día del primer año de infecciones en un país'},
    {value: '7', viewValue: '20. Tasa de crecimiento de casos de COVID-19 en relación con nuevos casos diarios y tasa de muerte por COVID-19'},
    {value: '2', viewValue: '21. Predicciones de casos y muertes en todo el mundo.'},
    {value: '6', viewValue: '22. Tasa de mortalidad por coronavirus (COVID-19) en un país'},
    {value: 'x', viewValue: '23. Factores de muerte por COVID-19 en un país'},
    {value: '3', viewValue: '24. Comparación entre el número de casos detectados y el número de pruebas de un país'},
    {value: '2', viewValue: '25. Predicción de casos confirmados por día'},
 
  ];

  regresiones:Reporte[]=[
    {value: '1', viewValue: 'Lineal'},
    {value: '2', viewValue: 'Polinomial'}
  ];

  constructor(private ngxCsvParser: NgxCsvParser, private conexion:ConexionService) {
  
    this.selectedValue="";
    this.regresionSelected="";

    this.selectX="";
    this.selectY="";
    this.selectYcomparar="";
    this.predecir="";
    this.columnaFiltrar="";
    this.valorFiltrar="";


    this.resultado="";
    this.resultado2="";
    this.grado="";

    this.titoloCarta="REPORTE";
  }

  enviarData(){
    console.log("es pais?",String(this.checked));
    this.grafica="data:image/png;base64,";
    this.formulaLineal="";
  
    /* console.log("el valor del reporte es:", this.selectedValue)
    console.log("el archivo es: ",this.archivo); */
    var formData= new FormData();
    formData.append("tipo_reporte",this.regresionSelected);
    formData.append("archivo",this.archivo);
    formData.append("ejeX",this.selectX);
    formData.append("ejeY",this.selectY);
    formData.append("predecir",this.predecir);
    formData.append("columna",this.columnaFiltrar);
    formData.append("valor",this.valorFiltrar);
    formData.append("grado",this.grado);
    formData.append("fecha",String(this.checked));
    formData.append("ejeYcomparar",this.selectYcomparar);
    console.log("el valor de nuevo a comparar es: ",this.selectYcomparar)
    this.conexion.testPost(formData).subscribe(data=>{
      console.log(data);
      var aux:any=data;
      this.resultado=aux.prediccion;
      this.grafica+=aux.grafica;
      this.r2=aux.r2;
       this.rmse=aux.rmse;
       this.total=aux.total;
       this.subtotal=aux.subTotal;
       this.porcentaje=aux.porcentaje;
       this.promedio=aux.promedio;
      if (this.regresionSelected==="1") {
        this.formulaLineal=aux.formula;
      }
      this.tituloReporte();
    })
  }

  enviarDataComparar(){
    //console.log("es pais?",String(this.checked));
    //this.grafica="data:image/png;base64,";
    this.grafica2="data:image/png;base64,";
    
    this.formulaLineal2="";
  
    /* console.log("el valor del reporte es:", this.selectedValue)
    console.log("el archivo es: ",this.archivo); */
    var formData= new FormData();
    formData.append("tipo_reporte",this.regresionSelected);
    formData.append("archivo",this.archivo);
    formData.append("ejeX",this.selectX);
    formData.append("ejeY",this.selectY);
    formData.append("predecir",this.predecir);
    formData.append("columna",this.columnaFiltrar);
    formData.append("valor",this.valorFiltrar);
    formData.append("grado",this.grado);
    formData.append("fecha",String(this.checked));
    formData.append("ejeYcomparar",this.selectYcomparar);
    //console.log("el valor de nuevo a comparar es: ",this.selectYcomparar)
    this.conexion.testPost(formData).subscribe(data=>{
      console.log(data);
      var aux:any=data;
      this.resultado2=aux.prediccion;
      this.grafica2+=aux.grafica;

      this.r22=aux.r2;
       this.rmse2=aux.rmse;
      if (this.regresionSelected==="1") {
        this.formulaLineal2=aux.formula;
      }
      //this.tituloReporte();
    })
  }




  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;
    this.archivo=files[0];

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe(result => {

        //console.log('Result', result);
        var listado:any=result;
        var pos1=JSON.stringify(listado[0]);
        console.log(pos1)
        var aux1=pos1.split(",")
        var aux2;
        
        aux1.forEach(element => {
          aux2=element.split(":");
          
          if (aux2[0].includes("{")) {
          
            aux2[0]=aux2[0].replace("{","");
          }
          if (aux2[0].includes("\"")) {
            aux2[0]=aux2[0].replace(/['"]+/g,"");
          }
          //console.log(aux2[0])
          this.etiquetas.push(aux2[0])
        });
        //this.csvRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });

  }


  crearPDF(){
    const pdfDefinition:any={
      content:[{
        text:'hola mundo'
      }]
    }

    const pdf =pdfMake.createPdf(pdfDefinition).open();
    pdf.open();
  }

  tituloReporte(){
    if (this.selectedValue==='1') {
      if (this.valorFiltrar) {
        this.titoloCarta='Tendencia de '+this.selectY+" por "+this.columnaFiltrar+" de "+this.valorFiltrar
      }else{
        this.titoloCarta='Tendencia de '+this.selectY
      }
      
    }else if (this.selectedValue==='2') {
      if (this.valorFiltrar) {
        this.titoloCarta='Prediccion de '+this.selectY+" por "+this.columnaFiltrar+" de "+this.valorFiltrar
      } else {
        this.titoloCarta='Prediccion de '+this.selectY
      }
       
    }
  }

  getRegresion(){
    if (this.regresionSelected=='1') {
      return "regresion lineal"
    }else if (this.regresionSelected=="2") {
      return "regresion polinomial con un grado de "+this.grado.toString()
    }
    return ""
  }
  getPrediccion(){
    if (this.predecir) {
      return " con una prediccion de "+this.predecir.toString()
    } else {
      return ""
    }
    
  }

  getFormula(){
    if (this.formulaLineal) {
      return "\n La formula cuadratica que se ajusta al modelo esta representada de la siguiente manera: "+this.formulaLineal
    } else {
      return ""
    }
  }

  getFormulaComparar(){
    if (this.formulaLineal) {
      return "\n La formula cuadratica que se ajusta al modelo de la grafica a comparar se expresa de la siguiente manera: "+this.formulaLineal2
    } else {
      return ""
    }
  }

  
  openPdfStyle() {
    const documentDefinitionPoli = {
      content: [
        // if you don't need styles, you can use a simple string to define a paragraph
        { text: this.titoloCarta, style: 'header',alignment: 'center' },
        {
          text: 'Luis Fernando Morales Garcia - OLC2 \n\n',
          style: ['quote', 'small'],alignment: 'center'
        },	
        {
          text: 'Predicción de datos con Python\n\n',
          style: 'subheader'
        },
        "Entre los lenguajes de programación, Python es conocido como aquel que logra dominar todas las estadísticas, relacionadas con la minería de datos e incluso el aprendizaje automático, es software libre, por lo que muchas personas han podido usarlo para desarrollar sus soluciones dando un lugar que ha Bibliotecas muy interesantes donde se pueden encontrar casi todas las técnicas de machine learning que existen actualmente, por supuesto, tiene su parte negativa, y es que derivada del hecho de que muchas personas han aportado, tiene su sintaxis específica para cada caso, lo que hace aprendizaje un poco complejo. Actualmente existe una solución muy viable, ya que Scikit-learn consiste en ser una estandarización conformada en una librería de código abierto, que intenta unificar en un mismo contexto todos los algoritmos y funciones posibles, ayudando en gran medida las fases de preprocesamiento, entrenamiento, optimización y validación. de los diferentes métodos predictivos utilizados. \n\n",
        ,	
        {
          text: 'Regresión lineal\n\n',
          style: 'subheader'
        },
        "Este modelo de predicción se basa en la posibilidad de calcular una línea recta que se acomode en la mayor medida posible a las diferentes muestras que se identifican dentro de la población que se toma para el análisis.        La forma de calcularlo se basa en que la regresión lineal se enfoca en definir los parámetros que se encuentran o caracterizan una función lineal, y = mx + b, de tal forma que los errores cuadráticos en la medición que se realizan, pueden ser eliminado hasta cierto punto. A la línea definida por la función descrita anteriormente, minimizando la distancia de cada médico a la línea, manualmente no es tan complejo, aunque el propósito de las diferentes soluciones que se presentan es realizar un modelo totalmente automatizado. \n\n",
        

        // using a { text: '...' } object lets you set styling properties
        'De acuerdo a los datos calculados y por el comportamiento de la grafica se realizo una '+this.getRegresion() +this.getPrediccion()+ " por lo que muestra la siguiente grafica evidenciando su comportamiento \n",
        { 
          image: this.grafica,
          fit: [300, 300],
        },
        {
          text: 'Medida de error\n\n',
          style: 'subheader'
        },
        "Como parte fundamental de los modelos con los que se definirá la información es que cuando existen problemas de esta naturaleza, ya sea machine learning o incluso ciencia de datos, en muy raras ocasiones son exactos, principalmente si se trata de la predicción del avance. de un virus patológico, ya que los resultados que se producen son probables, suelen ser estimaciones, esta razón da como resultado que siempre debe existir algún mecanismo que pueda evaluar la variación que existe y se da a lo largo de los cálculos realizados, claro está para saber los resultados que se están presentando como su precisión, y que estos puedan ser objetiva y cuantificablemente comparables, aplicando otros métodos adicionales que puedan sustentar en función de sus características hacia el comportamiento del conjunto de datos.  \n\n",
        

        // if you set pass an array instead of a string, you'll be able
        // to style any fragment individually
        'Es importante tomar en cuenta el valor de la R^2 para determinar que tan cerca estan los datos de la linea de regresion asi como el valor del RMSE para determinar el error del analisis o la incerteza por lo que acontinuacion se detallan su valores: \n',
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['auto', 'auto'],

            body: [
              [{ text:'R^2',bold:true}, {text:'RMSE',bold:true}],
              [this.r2.toString(), this.rmse.toString()]
            ]
          }
        },
        {
          text:this.getFormula(), bold:true
        }
      ],
      styles:{
        header: {
          fontSize: 17,
          bold: true,
          alignment: 'justify'
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      }
    };

    const documentDefinitionPorcentaje = {
      pageMargins: [ 35, 35, 35, 65 ],
      content: [
        // if you don't need styles, you can use a simple string to define a paragraph
        { text: 'Reporte del porcentaje de '+this.selectX+" / "+this.selectY +" en "+this.valorFiltrar, style: 'header',alignment: 'center' },
        {
          text: 'Luis Fernando Morales Garcia - OLC2 \n\n',
          style: ['quote', 'small'],alignment: 'center'
        },	
        {
          text: 'Predicción de datos con Python\n\n',
          style: 'subheader'
        },
        "Entre los lenguajes de programación, Python es conocido como aquel que logra dominar todas las estadísticas, relacionadas con la minería de datos e incluso el aprendizaje automático, es software libre, por lo que muchas personas han podido usarlo para desarrollar sus soluciones dando un lugar que ha Bibliotecas muy interesantes donde se pueden encontrar casi todas las técnicas de machine learning que existen actualmente, por supuesto, tiene su parte negativa, y es que derivada del hecho de que muchas personas han aportado, tiene su sintaxis específica para cada caso, lo que hace aprendizaje un poco complejo. Actualmente existe una solución muy viable, ya que Scikit-learn consiste en ser una estandarización conformada en una librería de código abierto, que intenta unificar en un mismo contexto todos los algoritmos y funciones posibles, ayudando en gran medida las fases de preprocesamiento, entrenamiento, optimización y validación. de los diferentes métodos predictivos utilizados. \n\n",
        {
          text: 'Analisis\n\n',
          style: 'subheader'
        },
        // using a { text: '...' } object lets you set styling properties
        "Se obtuvo un total de "+this.total+" datos aunque unicamente un total de "+this.subtotal+" aplican por lo que se obtiene un porcentaje de "+this.porcentaje +"  \n\n",
        { 
          image: this.grafica,
          fit: [300, 300],
        },

      ],
      
      margin: [35, 35, 65, 35],
			alignment: 'justify',
      styles:{
        header: {
          fontSize: 17,
          bold: true,
          alignment: 'justify'
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      }
    };

    const documentDefinitionPoliPromedio = {
      content: [
        // if you don't need styles, you can use a simple string to define a paragraph
        { text: "Reporde de promedio entre "+this.selectX +" y "+this.selectY, style: 'header',alignment: 'center' },
        {
          text: 'Luis Fernando Morales Garcia - OLC2 \n\n',
          style: ['quote', 'small'],alignment: 'center'
        },	
        {
          text: 'Predicción de datos con Python\n\n',
          style: 'subheader'
        },
        "Entre los lenguajes de programación, Python es conocido como aquel que logra dominar todas las estadísticas, relacionadas con la minería de datos e incluso el aprendizaje automático, es software libre, por lo que muchas personas han podido usarlo para desarrollar sus soluciones dando un lugar que ha Bibliotecas muy interesantes donde se pueden encontrar casi todas las técnicas de machine learning que existen actualmente, por supuesto, tiene su parte negativa, y es que derivada del hecho de que muchas personas han aportado, tiene su sintaxis específica para cada caso, lo que hace aprendizaje un poco complejo. Actualmente existe una solución muy viable, ya que Scikit-learn consiste en ser una estandarización conformada en una librería de código abierto, que intenta unificar en un mismo contexto todos los algoritmos y funciones posibles, ayudando en gran medida las fases de preprocesamiento, entrenamiento, optimización y validación. de los diferentes métodos predictivos utilizados. \n\n",
        ,	
        {
          text: 'Regresión lineal\n\n',
          style: 'subheader'
        },
        "Este modelo de predicción se basa en la posibilidad de calcular una línea recta que se acomode en la mayor medida posible a las diferentes muestras que se identifican dentro de la población que se toma para el análisis.        La forma de calcularlo se basa en que la regresión lineal se enfoca en definir los parámetros que se encuentran o caracterizan una función lineal, y = mx + b, de tal forma que los errores cuadráticos en la medición que se realizan, pueden ser eliminado hasta cierto punto. A la línea definida por la función descrita anteriormente, minimizando la distancia de cada médico a la línea, manualmente no es tan complejo, aunque el propósito de las diferentes soluciones que se presentan es realizar un modelo totalmente automatizado. \n\n",
        

        // using a { text: '...' } object lets you set styling properties
        'De acuerdo a los datos calculados y por el comportamiento de la grafica se realizo una '+this.getRegresion() +this.getPrediccion()+ " por lo que muestra la siguiente grafica evidenciando su comportamiento \n",
        { 
          image: this.grafica,
          fit: [300, 300],
        },
        {
          text: 'Medida de error\n\n',
          style: 'subheader'
        },
        "Como parte fundamental de los modelos con los que se definirá la información es que cuando existen problemas de esta naturaleza, ya sea machine learning o incluso ciencia de datos, en muy raras ocasiones son exactos, principalmente si se trata de la predicción del avance. de un virus patológico, ya que los resultados que se producen son probables, suelen ser estimaciones, esta razón da como resultado que siempre debe existir algún mecanismo que pueda evaluar la variación que existe y se da a lo largo de los cálculos realizados, claro está para saber los resultados que se están presentando como su precisión, y que estos puedan ser objetiva y cuantificablemente comparables, aplicando otros métodos adicionales que puedan sustentar en función de sus características hacia el comportamiento del conjunto de datos.  \n\n",
        

        // if you set pass an array instead of a string, you'll be able
        // to style any fragment individually
        'Es importante tomar en cuenta el valor de la R^2 para determinar que tan cerca estan los datos de la linea de regresion asi como el valor del RMSE para determinar el error del analisis o la incerteza por lo que acontinuacion se detallan su valores: \n',
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['auto', 'auto'],

            body: [
              [{ text:'R^2',bold:true}, {text:'RMSE',bold:true}],
              [this.r2.toString(), this.rmse.toString()]
            ]
          }
        },
        {
          text:this.getFormula(), bold:true
        },
        {
          text: 'sklearn.metrics.f1_score\n\n',
          style: 'subheader'
        },
        "El parametro Macro Calcula las métricas globalmente contando el total de verdaderos positivos,falsos negativos y falsos positivos.",
        {
          text:"dando como resultado un valor promedio de "+this.promedio +" paa el calculo de "+this.selectX+" y "+this.selectY,bold:true
        }
      ],
      styles:{
        header: {
          fontSize: 17,
          bold: true,
          alignment: 'justify'
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      }
    };
    if (this.selectedValue=="4") {
      pdfMake.createPdf(documentDefinitionPorcentaje).download();
    }else if(this.selectedValue=="5"){
      pdfMake.createPdf(documentDefinitionPoliPromedio).download();
    }else {
      pdfMake.createPdf(documentDefinitionPoli).download();
    }
    
  }

  openPdfStyleComparar() {
    const documentDefinitionPoli = {
      content: [
        // if you don't need styles, you can use a simple string to define a paragraph
        { text: this.titoloCarta, style: 'header',alignment: 'center' },
        {
          text: 'Luis Fernando Morales Garcia - OLC2 \n\n',
          style: ['quote', 'small'],alignment: 'center'
        },	
        {
          text: 'Predicción de datos con Python\n\n',
          style: 'subheader'
        },
        "Entre los lenguajes de programación, Python es conocido como aquel que logra dominar todas las estadísticas, relacionadas con la minería de datos e incluso el aprendizaje automático, es software libre, por lo que muchas personas han podido usarlo para desarrollar sus soluciones dando un lugar que ha Bibliotecas muy interesantes donde se pueden encontrar casi todas las técnicas de machine learning que existen actualmente, por supuesto, tiene su parte negativa, y es que derivada del hecho de que muchas personas han aportado, tiene su sintaxis específica para cada caso, lo que hace aprendizaje un poco complejo. Actualmente existe una solución muy viable, ya que Scikit-learn consiste en ser una estandarización conformada en una librería de código abierto, que intenta unificar en un mismo contexto todos los algoritmos y funciones posibles, ayudando en gran medida las fases de preprocesamiento, entrenamiento, optimización y validación. de los diferentes métodos predictivos utilizados. \n\n",
        ,	
        {
          text: 'Regresión lineal\n\n',
          style: 'subheader'
        },
        "Este modelo de predicción se basa en la posibilidad de calcular una línea recta que se acomode en la mayor medida posible a las diferentes muestras que se identifican dentro de la población que se toma para el análisis.        La forma de calcularlo se basa en que la regresión lineal se enfoca en definir los parámetros que se encuentran o caracterizan una función lineal, y = mx + b, de tal forma que los errores cuadráticos en la medición que se realizan, pueden ser eliminado hasta cierto punto. A la línea definida por la función descrita anteriormente, minimizando la distancia de cada médico a la línea, manualmente no es tan complejo, aunque el propósito de las diferentes soluciones que se presentan es realizar un modelo totalmente automatizado. \n\n",
        

        // using a { text: '...' } object lets you set styling properties
        'De acuerdo a los datos calculados y por el comportamiento de la grafica se realizo una '+this.getRegresion() +this.getPrediccion()+ " por lo que muestra la siguiente grafica evidenciando su comportamiento \n",
        { 
          image: this.grafica,
          fit: [300, 300],
        },
        'Sin embargo al realizar la comparacion con '+this.selectYcomparar+" se obtuvo la siguiente grafica",
        { 
          image: this.grafica2,
          fit: [300, 300],
        },
        {
          text: 'Medida de error\n\n',
          style: 'subheader'
        },
        "Como parte fundamental de los modelos con los que se definirá la información es que cuando existen problemas de esta naturaleza, ya sea machine learning o incluso ciencia de datos, en muy raras ocasiones son exactos, principalmente si se trata de la predicción del avance. de un virus patológico, ya que los resultados que se producen son probables, suelen ser estimaciones, esta razón da como resultado que siempre debe existir algún mecanismo que pueda evaluar la variación que existe y se da a lo largo de los cálculos realizados, claro está para saber los resultados que se están presentando como su precisión, y que estos puedan ser objetiva y cuantificablemente comparables, aplicando otros métodos adicionales que puedan sustentar en función de sus características hacia el comportamiento del conjunto de datos.  \n\n",
        


        // if you set pass an array instead of a string, you'll be able
        // to style any fragment individually
        'Es importante tomar en cuenta el valor de la R^2 para determinar que tan cerca estan los datos de la linea de regresion asi como el valor del RMSE para determinar el error del analisis o la incerteza por lo que acontinuacion se detallan su valores: \n',
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['auto', 'auto','auto', 'auto'],

            body: [
              [{ text:'R^2',bold:true}, {text:'RMSE',bold:true},{ text:'R^2 Comparacion',bold:true}, {text:'RMSE Comparacion',bold:true}],
              [this.r2.toString(), this.rmse.toString(),this.r22.toString(), this.rmse2.toString()]
            ]
          }
        },
        {
          text:this.getFormula(), bold:true
        },
        {
          text:this.getFormulaComparar(), bold:true
        }
      ],
      styles:{
        header: {
          fontSize: 17,
          bold: true,
          alignment: 'justify'
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      }
    };
    pdfMake.createPdf(documentDefinitionPoli).download();
  }
}
