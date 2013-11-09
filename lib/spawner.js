var spawn = require('child_process').spawn;

var onStderr = function( data ){

    console.log( ''+ data );

}

var onStdout = function( data ){

    console.log( '' + data );

}

var Spawner = function( processName ){

    this.processName = processName;
    this.options = {};
    this.stderr = onStderr;
    this.stdout = onStdout;
    this.arguments = [];

    return this;

};

Spawner.prototype = {

    withArguments : function( args ){

        this.args = args;
        return this;

    },

    inWorkingDirectory : function( wd ){

        this.options.cwd = wd;
        return this;

    },

    onStderr : function( callback ){

        this.stderr = callback;
        return this;

    },

    onStdout : function( callback ){

        this.stdout = callback;
        return this;

    },

    execute : function( callback ){

        this.proc = spawn(this.processName, this.args, this.options);
        this.proc.stdout.on('data', this.stdout);
        this.proc.stderr.on('data', this.stderr);
        this.proc.on('exit', function( code ){

            callback( code );

        });

        return this;

    }

}


module.exports = exports = function( processName ){

    return new Spawner( processName );

}