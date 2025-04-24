import Svg, { LinearGradient, Defs, Stop, Rect, Path } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';

export const BeveledCornerSquare = ({
  bevelSize,
  backgroundColor = 'white',
  borderColor = 'black',
  borderWidth = 2,
  children, // Accept children to render inside the component
}) => {
  // Define the aspect ratio for A4 size
  const aspectRatio = 1.4142;

  // Let's assume a width of 320 pixels for this example
  const width = 320;
  const height = width * aspectRatio;

  // Calculate the actual bevelSize based on the size of the component if needed
  const actualBevelSize = bevelSize ? bevelSize : width * 0.1;

  const d = `
    M ${borderWidth / 2},${borderWidth / 2}
    L ${width - actualBevelSize - (borderWidth / 2)},${borderWidth / 2}
    L ${width - (borderWidth / 2)},${actualBevelSize + (borderWidth / 2)}
    L ${width - (borderWidth / 2)},${height - (borderWidth / 2)}
    L ${borderWidth / 2},${height - (borderWidth / 2)}
    Z
  `;

  const shadowOffset = 30;
  const shadowColor = 'rgba(1, 233, 0, 0.3)'; // Adjust as needed for shadow color

  // Adjust the shadow path to be slightly larger than the main path
  const expandedBevelSize = actualBevelSize + shadowOffset;
  const shadowD = `
    M ${borderWidth},${borderWidth}
    L ${width - expandedBevelSize},${borderWidth}
    L ${width},${expandedBevelSize}
    L ${width},${height}
    L ${borderWidth},${height}
    Z
  `;

  return (
    <View style={{ width: width, height: height, position: 'relative' }}>
      <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#e6e6e6" stopOpacity="1" />
            <Stop offset="1" stopColor="#e6e6e6" stopOpacity="0.01" />
          </LinearGradient>
        </Defs>
        <Path
          d={d}
          fill="url(#grad)" // Use the gradient for the fill
          stroke={borderColor}
          strokeWidth={borderWidth}
        />
      </Svg>

      <View style={[StyleSheet.absoluteFill, { zIndex: 1 }]}>
        {children}
      </View>
    </View>
  );
};
