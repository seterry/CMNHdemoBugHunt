//
// Virtual Arrow Keys
// CMNH
//

var VirtualArrowKeys = function (state) {
    this.fingerDown = false;
    
    this.cursors = state.input.keyboard.createCursorKeys();
    
    state.input.onDown.add(function(p) {
        this.fingerDown = true;
    }, this);
    
    state.input.onUp.add(function(p) {
        this.fingerDown = false;
    }, this);
};

VirtualArrowKeys.prototype.getArrowKey = function(state) {
    
    if (this.fingerDown) {
        var x = state.game.input.x;
        var y = state.game.input.y;
        
        var left_d = (x*x) + ((state.game.height/2 - y) * (state.game.height/2 - y));
        
        var right_d = ((x-state.game.width) * (x-state.game.width)) + ((state.game.height/2 - y) * (state.game.height/2 - y));
        
        var up_d = (y*y) + ((state.game.width/2 - x) * (state.game.width/2 - x));
        
        var down_d = ((y-state.game.height) * (y-state.game.height)) + ((state.game.width/2 - x) * (state.game.width/2 - x));
        
        var closest = 99999;
        var closest_dir = "";
        if (left_d < closest) {
            closest = left_d;
            closest_dir = "left";
        }
        if (right_d < closest) {
            closest = right_d;
            closest_dir = "right";
        }
        if (up_d < closest) {
            closest = up_d;
            closest_dir = "up";
        }
        if (down_d < closest) {
            closest = down_d;
            closest_dir = "down";
        }
        
        if (closest_dir != "") {
            return closest_dir;
        }
    }
    
    if (this.cursors.left.isDown) {
        return "left";
    }
    
    if (this.cursors.right.isDown) {
        return "right";
    }
    
    if (this.cursors.up.isDown) {
        return "up";
    }
    
    if (this.cursors.down.isDown) {
        return "down"
    }
    
    return "";
};
