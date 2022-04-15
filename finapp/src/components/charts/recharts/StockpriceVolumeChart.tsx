import React, { useState } from 'react'
import { DateTime } from 'luxon';
import {
  Legend,
  ReferenceLine,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ReferenceArea,
  Bar,
  ComposedChart,
} from 'recharts';


interface Props {
  data: any,
  datetimeKey: string,
  stockpriceKey: string,
  volumeKey?: string,
  width?: number,
  height?: number,
  title?: string,
  bkColor?: string
};

const StockpriceVolumeChart: React.FC<Props> = (props: Props) => {
  const [refAreaLeft, setRefAreaLeft] = useState<string | null>(null)
  const [refAreaRight, setRefAreaRight] = useState<string | null>(null)
  const [isAreaSelecting, setIsAreaSelecting] = useState<boolean>(false)
  const [startIndex, setStartIndex] = useState<number>(10)
  const [endIndex, setEndIndex] = useState<number>(props.data.length-10)

  return (
    <ComposedChart 
      style={{'userSelect': 'none', 'backgroundColor': props.bkColor ? props.bkColor : '#333333'}}
      width={props.width ? props.width : 800}
      height={props.height ? props.height : 500}
      data={props.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      onMouseDown={ (e: any) => {
        if (e === null) {
          return
        }
        setIsAreaSelecting(true)
        setRefAreaLeft(e!.activeLabel)
        console.log(`refAreaLeft : ${e!.activeLabel}`)
        return false
      }}
      onMouseMove={ (e: any) => {
        if (e === null) {
          return
        }
        if (isAreaSelecting) {
          setRefAreaRight(e.activeLabel)
          return false
        }
      }}
      onMouseUp={() => {
        setIsAreaSelecting(false)
        console.log(`refAreaRight : ${refAreaRight}`)
        return false
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={`${props.datetimeKey}`} tick={{ fontSize: '.7rem' }} />
      <YAxis
        // domain={[0, 100]}
        type="number"
        yAxisId={0}
        tick={{ fontSize: '0.9rem' }}
        label={{ value: props.stockpriceKey, angle: -90, dx: -20 }}
      />
      {
        props.volumeKey ?
          <YAxis
            domain={[0, 2.0*Math.max(...props.data.map((v: any) => v[props.volumeKey as string]))]}
            type="number"
            yAxisId={1}
            tick={{ fontSize: '0.9rem' }}
            orientation="right"
            label={{ value: "volume", angle: -90, dx: 20 }}
          />
          :
          ""
      }
      <Tooltip />
      <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
      <ReferenceLine y={0} stroke="#000" />
      <Brush
        className="TimeLineChart-brush"
        dataKey={`${props.datetimeKey}`}
        stroke="#8888EE"
        startIndex={startIndex}
        endIndex={endIndex}
        onWheel={(e: any) => {console.log(e)}}
        height={20}
      />
      <Line yAxisId={0} dataKey={`${props.stockpriceKey}`} stroke="#881111" fill="#881111" />
      {
        props.volumeKey ?
          <Bar yAxisId={1} dataKey={`${props.volumeKey}`} fill="#4484d8" />
          :
          ""
      }
      {refAreaLeft && refAreaRight ? (
        <ReferenceArea
          // yAxisId="1"
          x1={refAreaLeft}
          x2={refAreaRight}
          strokeOpacity={0.3}
        />
      ) : null}
    </ComposedChart >
  );
};

export default StockpriceVolumeChart;
