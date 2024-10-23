// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The transformation first applies scale, then rotation, and finally translation.
// The given rotation value is in degrees.


function GetTransform( positionX, positionY, rotation, scale )
{
	let scaleTransform = new Array(scale, 0, 0, 0, scale, 0, 0, 0, 1);
	let radians = rotation * Math.PI / 180;
	let rotationTransform =  new Array(Math.cos(radians), Math.sin(radians),0, -Math.sin(radians), Math.cos(radians),0,0,0,1);
	let translationTransform = new Array(1,0,0,0,1,0,positionX,positionY,1);
	return ApplyTransform(ApplyTransform(scaleTransform, rotationTransform), translationTransform);
}

// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The arguments are transformation matrices in the same format.
// The returned transformation first applies trans1 and then trans2.
function ApplyTransform( trans1, trans2 )
{
	if(trans1.length != trans2.length) return;
	let rows = Math.sqrt(trans1.length);
	let result = new Array(trans1.length);
	for(var i = 0; i < rows; i++){
		for(var j = 0; j < rows; j++){
			result[i + j * rows] = 0;
			for(var k = 0; k < rows; k++){
				result[i + j * rows] += trans2[i + k * rows] * trans1[k + j * rows];
			}
		}
	}	
	return result;
}
