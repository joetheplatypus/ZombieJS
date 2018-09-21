class Map {
  constructor() {
    this.tileSize = 62;
    this.height = 100;
    this.width = 100;
	this.size = this.width*this.height;

    this.tiles = [];
    for(var i = 0; i < this.height; i++) {
      this.tiles.push(new Array(this.width));
    }
  }
  coordToTile(coords) {
    const tile = {}
    tile.x = Math.round(coords.x / this.tileSize);
    tile.y = Math.round(coords.y / this.tileSize);
    return tile;
  }

  tileToCoords(tile) {
    const coords = {}
    coords.x = tile.x * this.tileSize;
    coords.y = tile.y * this.tileSize;
    return coords;
  }

  snapCoordsToTile(coords) {
    const tile = this.coordToTile(coords);
    const scoords = this.tileToCoords(tile);
    return scoords;
  }

  snapTileInMap(tile) {
    const newTile = tile;
    if(newTile.x <= 0) {
      newTile.x = 0;
    }
    if(newTile.y <= 0) {
      newTile.y = 0;
    }
    if(newTile.x >= this.width-1) {
      newTile.x = this.width-1;
    }
    if(newTile.y >= this.height-1) {
      newTile.y = this.height-1;
    }
    return newTile;
  }

  snapCoordsInMap(coords) {
    const newCoords = coords;
    if(newCoords.x <= 0) {
      newCoords.x = 0;
    }
    if(newCoords.y <= 0) {
      newCoords.y = 0;
    }
    if(newCoords.x >= (this.width-1)*this.tileSize) {
      newCoords.x = (this.width-1)*this.tileSize;
    }
    if(newCoords.y >= (this.height-1)*this.tileSize) {
      newCoords.y = (this.height-1)*this.tileSize;
    }
    return newCoords;
  }

  isPositionWall(pos) {
    if(this.tiles[pos.y][pos.x] || pos.y < 0 || pos.x < 0 || pos.x > this.width-1 || pos.y > this.height-1) {
		return true;
	}
	return false;
  }

  addBlock(block) {
    const pos = this.coordToTile({x:block.x,y:block.y})
    this.tiles[pos.y][pos.x] = block
  }

  getSize() {
    return {
      width:this.width,
      height:this.height,
    }
  }
  
  //path finding
	findPath(world, start, end) {
		// create Nodes from the Start and End x,y coordinates
		var	mypathStart = new MapNode(null, {x:start.x, y:start.y});
		var mypathEnd = new MapNode(null, {x:end,x, y:end.y});
		// create an array that will contain all world cells
		var AStar = new Array(this.size);
		// list of currently open Nodes
		var Open = [mypathStart];
		// list of closed Nodes
		var Closed = [];
		// list of the final output array
		var result = [];
		// reference to a Node (that is nearby)
		var myNeighbours;
		// reference to a Node (that we are considering now)
		var myNode;
		// reference to a Node (that starts a path in question)
		var myPath;
		// temp integer variables used in the calculations
		var length, max, min, i, j;
		// iterate through the open list until none are left
		while(length = Open.length)
		{
			max = this.size;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
			// grab the next node and remove it from Open array
			myNode = Open.splice(min, 1)[0];
			// is it the destination node?
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
				// clear the working arrays
				AStar = Closed = Open = [];
				// we want to return start to finish
				result.reverse();
			}
			else // not the destination
			{
				// find which nearby nodes are walkable
				myNeighbours = Neighbours(myNode.x, myNode.y);
				// test each one that hasn't been tried already
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
						// estimated cost of this particular route so far
						myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
						// estimated cost of entire guessed route to the destination
						myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
						// remember this new path for testing above
						Open.push(myPath);
						// mark this node in the world graph as visited
						AStar[myPath.value] = true;
					}
				}
				// remember this route as having no more untested options
				Closed.push(myNode);
			}
		} // keep iterating until the Open list is empty
		return result;
	}
	}
	
	euclideanDistance(Point, Goal) {
		return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
	}
	
	getNeighbours(tile, diagonals)	{
		const N = this.isPositionWall({x:tile.x,y:tile.y-1});
		const S = this.isPositionWall({x:tile.x,y:tile.y+1});
		const E = this.isPositionWall({x:tile.x+1,y:tile.y});
		const W = this.isPositionWall({x:tile.x-1,y:tile.y});
		let result = [];
		
		if(N) {
			result.push(N)
			if(diagonals) {
				const NE = this.isPositionWall({x:tile.x+1,y:tile.y-1});
				const NW = this.isPositionWall({x:tile.x-1,y:tile.y-1});
				if(NE) {
					result.push(NE)
				}
				if(NW) {
					result.push(NW)
				}
			}
		}
		if(S) {
			result.push(S)
			if(diagonals) {
				const SE = this.isPositionWall({x:tile.x+1,y:tile.y+1});
				const SW = this.isPositionWall({x:tile.x-1,y:tile.y+1});
				if(NE) {
					result.push(SE)
				}
				if(NW) {
					result.push( )
				}
			}
		}
		if(E) {
			result.push(E)
		}
		if(W) {
			result.push(W)
		}
		return result;
	}
	

}
const map = new Map
module.exports = map;

class MapNode {
	constructor(parent, point) {
		this.parent = parent;
		this.point = point;		
		this.f = 0;
		this.g = 0;
		this.flatIndex = this.x + (this.y * map.width)
	}
}