import * as React from 'react';
import Plot from 'react-plotly.js';
import { BasePlotlyDataType } from '../../../types/Plotly';


interface Props {
  data: BasePlotlyDataType[],
  width?: number,
  height?: number,
  title?: string,
};

const BasePlotlyChart: React.FC<Props> = (props: Props) => {
  return (
    <Plot
      // data={[
      //   {
      //     x: [1, 2, 3],
      //     y: [2, 6, 3],
      //     type: 'scatter',
      //     mode: 'lines+markers',
      //     marker: {color: 'red'},
      //   },
      //   {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
      // ]}
      data={props.data as any}
      layout={ {width: props.width, height: props.height, title: props.title} }
    />
  );
}
 
export default BasePlotlyChart;
