# 📊 Trading Journal – Astro Project

Proyecto personal de **registro y visualización de operaciones de trading**, construido con **Astro + TypeScript + MySQL**, enfocado en llevar un control visual, estadístico y cronológico de las operaciones realizadas.

El proyecto se desarrolla en **una sola página principal**, organizada en **secciones bien definidas**.

---

## 🎯 Objetivo del proyecto

* Registrar operaciones de trading de forma manual
* Visualizar resultados por día, semana y mes
* Identificar días verdes y rojos
* Analizar el rendimiento mediante filtros y gráficas
* Mantener una estructura simple, clara y escalable

---

## 🧱 Stack tecnológico

* **Frontend:** Astro + TypeScript
* **Backend:** Astro API Routes
* **Base de datos:** MySQL
* **Driver DB:** mysql2/promise
* **Estilos:** CSS personalizado + Tailwind CSS
* **Gráficas (futuro):** Chart.js / ECharts (pendiente)

---

## 🗄️ Base de datos

### Tabla principal: `trades`

Registra cada operación individual.

Campos principales:

* Fecha del trade
* Tipo (LONG / SHORT)
* Activo (símbolo)
* Cantidad
* Precio de entrada
* Precio de salida
* PnL (ganancia o pérdida)
* Comentario opcional

Esta tabla es la fuente de datos para:

* Calendario
* Filtros
* Gráficas
* Estadísticas

---

## 🧩 Estructura general de la página

La aplicación consta de **una sola página** dividida en secciones.

### 1️⃣ Calendario de Trading

**(Sección superior / principal)**

Función:

* Mostrar un calendario mensual
* Cada día muestra:

  * PnL total del día
  * Número de trades
* Colores:

  * Verde → día positivo
  * Rojo → día negativo
* Totales por semana (opcional)

Estado:

* ⏳ Pendiente de implementar

---

### 2️⃣ Formulario de Registro de Operaciones

**(Sección lateral o superior derecha)**

Función:

* Registrar nuevas operaciones manualmente
* Campos:

  * Fecha
  * Tipo (LONG / SHORT)
  * Activo
  * Cantidad
  * Precio entrada
  * Precio salida
  * Comentario (opcional)
* El PnL se calcula automáticamente

Estado:

* ✅ Implementado (frontend)
* ✅ Conectado a API POST
* ✅ Guarda en la base de datos

---

### 3️⃣ Sección de Detalle y Filtros

**(Debajo del calendario)**

Función:

* Visualizar trades en detalle
* Filtros posibles:

  * Por día
  * Por rango de fechas
  * Por mes
  * Por activo
  * Por trades ganadores / perdedores
* Mostrar:

  * Lista de trades
  * Totales de PnL
  * Número de operaciones

Estado:

* ⏳ Pendiente de implementar

---

### 4️⃣ Sección de Gráficas y Estadísticas

**(Parte inferior de la página)**

Función:

* Análisis visual del rendimiento
* Gráficas previstas:

  * Equity curve (PnL acumulado)
  * PnL por día / mes
  * Win rate
  * Distribución de ganancias y pérdidas

Estado:

* ⏳ Pendiente de implementar

---

## 🔁 Flujo de datos

1. Usuario registra un trade en el formulario
2. El frontend calcula el PnL
3. Se envía el formulario al endpoint `/api/trades`
4. El backend valida y guarda el trade en MySQL
5. Los datos se usan para:

   * Calendario
   * Filtros
   * Gráficas

---

## 🧭 Roadmap de tareas (orden recomendado)

### Fase 1 – Base sólida ✅

* [x] Diseñar base de datos
* [x] Conectar Astro con MySQL
* [x] Endpoint POST para trades
* [x] Formulario alineado a la DB

### Fase 2 – Visualización 📅

* [ ] Endpoint de resumen diario
* [ ] Componente de calendario mensual
* [ ] Mostrar PnL y trades por día

### Fase 3 – Análisis 🔍

* [ ] Sección de filtros
* [ ] Listado de trades filtrado
* [ ] Totales dinámicos

### Fase 4 – Estadísticas 📈

* [ ] Gráfica de equity
* [ ] PnL por período
* [ ] Win rate

---

## 🧠 Principios del proyecto

* Simplicidad antes que complejidad
* Control total del diseño (sin librerías de calendario)
* Datos claros y confiables
* Escalable sin reescribir todo

---

## 🚀 Estado actual del proyecto

El proyecto se encuentra en **fase de registro y backend funcional**, listo para avanzar hacia el **calendario y la visualización de datos**.
