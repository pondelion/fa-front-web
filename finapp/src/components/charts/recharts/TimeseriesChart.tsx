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
  xKey: string,
  lineDataKeys?: string[],
  barDataKeys?: string[]
  width?: number,
  height?: number,
  title?: string,
};

const TimeseriesChart: React.FC<Props> = (props: Props) => {
  const [refAreaLeft, setRefAreaLeft] = useState<string | null>(null)
  const [refAreaRight, setRefAreaRight] = useState<string | null>(null)
  const [isAreaSelecting, setIsAreaSelecting] = useState<boolean>(false)
  const [startIndex, setStartIndex] = useState<number>(10)
  const [endIndex, setEndIndex] = useState<number>(props.data.length-10)

  return (
    <ComposedChart 
      style={{'userSelect': 'none', 'backgroundColor': '#333333'}}
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
      <XAxis dataKey={`${props.xKey}`} tick={{ fontSize: '.7rem' }} />
      <YAxis
        // domain={[0, 100]}
        // type="number"
        yAxisId={0}
        tick={{ fontSize: '0.9rem' }}
      />
      <Tooltip />
      <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
      <ReferenceLine y={0} stroke="#000" />
      <Brush
        className="TimeLineChart-brush"
        dataKey={`${props.xKey}`}
        stroke="#8888EE"
        startIndex={startIndex}
        endIndex={endIndex}
        onWheel={(e: any) => {console.log(e)}}
        height={20}
      />
      {
        props.lineDataKeys ?
          props.lineDataKeys.map((key) => {
            return (
              <Line yAxisId={0} dataKey={`${key}`} fill="#8884d8" />
            )
          })
          :
          ""
      }
      {/* <Line dataKey="value" fill="#8884d8" />
      <Line dataKey="value2" stroke="#881111" fill="#881111" /> */}
      {
        props.barDataKeys ?
          props.barDataKeys.map((key) => {
            return (
              <Bar yAxisId={0} dataKey={`${key}`} fill="#8884d8" />
            )
          })
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

export default TimeseriesChart;
