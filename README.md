# CovidAnalysis

# Manual de usuario

El programa de Data Analysis Covid cuenta con una pantalla inicial en la cual se puede cargar un archivo de tipo CSV para poder realizar del analisis correspondiente en base a 25 tipos de reportes.


[![Image from Gyazo](https://i.gyazo.com/abff707e2d9c82abef5d26f7e930d5a7.png)](https://gyazo.com/abff707e2d9c82abef5d26f7e930d5a7)


### Listado de reportes

- Tendencia de la infección por Covid-19 en un País.
- Predicción de Infertados en un País.- 
- Indice de Progresión de la pandemia.
- Predicción de mortalidad por COVID en un Departamento.
- Predicción de mortalidad por COVID en un País.
- Análisis del número de muertes por coronavirus en un País.
- Tendencia del número de infectados por día de un País.
- Predicción de casos de un país para un año.
- Tendencia de la vacunación de en un País.
- Ánalisis Comparativo de Vacunaciópn entre 2 paises.
- Porcentaje de hombres infectados por covid-19 en un País desde el primer caso activo
- Ánalisis Comparativo entres 2 o más paises o continentes.
- Muertes promedio por casos confirmados y edad de covid 19 en un País.
- Muertes según regiones de un país - Covid 19.
- Tendencia de casos confirmados de Coronavirus en un departamento de un País.
- Porcentaje de muertes frente al total de casos en un país, región o continente.
- Tasa de comportamiento de casos activos en relación al número de muertes en un continente.
- Comportamiento y clasificación de personas infectadas por COVID-19 por municipio en un País.
- Predicción de muertes en el último día del primer año de infecciones en un país.
- Tasa de crecimiento de casos de COVID-19 en relación con nuevos casos diarios y tasa de muerte por COVID-19
- Predicciones de casos y muertes en todo el mundo - Neural Network MLPRegressor
- Tasa de mortalidad por coronavirus (COVID-19) en un país.
- Factores de muerte por COVID-19 en un país.
- Comparación entre el número de casos detectados y el número de pruebas de un país.
- Predicción de casos confirmados por día


## Parametrizacion

De acuerdo al reporte seleccionado se despliega una seria de campos en las que se debe señalar cuales son los encabezados del archivo que se utilizaran
[![Image from Gyazo](https://i.gyazo.com/2a17d164c3e4c3999dafdecef3e40421.png)](https://gyazo.com/2a17d164c3e4c3999dafdecef3e40421)


Al darle click a solicitar se despliega una pequeña grafica con el comportamiento de los datos selccionados. alli mismo podemos observar un boton para descarg en un pdf el reporte detallado.

[![Image from Gyazo](https://i.gyazo.com/c72714f334b77753203cfea3de724df9.png)](https://gyazo.com/c72714f334b77753203cfea3de724df9)
El reporte PDF cuenta con una descripcion de la grafica y de los errores y si fues el caso tambien el promedio o la pendiente de la recta.

[![Image from Gyazo](https://i.gyazo.com/3a2b07cac8a2c44adff281d60f26b5ad.png)](https://gyazo.com/3a2b07cac8a2c44adff281d60f26b5ad)



# Manual Tecnico

El programa se encuentra desplegado en una maquina virtual de Google Cloud asi como el Backend se encuentra alojado en otra maquina

[![Image from Gyazo](https://i.gyazo.com/1d462c5f3e5e4b2e54df4b7d83224d83.png)](https://gyazo.com/1d462c5f3e5e4b2e54df4b7d83224d83)

La interfaz fue desarrollado con Angular y el backend con python y flask, ademas de algunas librerias adiconales;

- PDFmake
- Flask
- Angular Material

## Backend 

Para el desarrollo del analisis se utilizo la libreria de Scikit Learn la cuale permite generar tendencias y predecciones. Dicha libreria fue implementada en el backend el cual cuentta unicamente de una sola clase donde se encuentran dos metodos generales y una api para realizar las cousultas

[![Image from Gyazo](https://i.gyazo.com/83d785f4da5e456375a6ee74614bd434.png)](https://gyazo.com/83d785f4da5e456375a6ee74614bd434)

- metodo de Regresion Lineal
- metodo de Regresion Polinomial
- Api de tipo POST


## Frontend

El fronta cuenta con la estructura basica de angular y todo el desarrollo se realizo sobre un solo componente
[![Image from Gyazo](https://i.gyazo.com/476a769d795242b7303bf24af001ef64.png)](https://gyazo.com/476a769d795242b7303bf24af001ef64)

adicional se creo un servicio para poder realizar la conexion con el servidor de flask

[![Image from Gyazo](https://i.gyazo.com/36d390317730ea6ffdda72c7db11f63d.png)](https://gyazo.com/36d390317730ea6ffdda72c7db11f63d)


