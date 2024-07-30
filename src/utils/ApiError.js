class ApiError extends Error{
    constructor(
        stausCode,
        message="Something went wrong",
        errors=[],
    ){
        super(message)
        this.stausCode=stausCode,
        this.message=message;
        this.data=null,
        this.success=false,
        this.errors=errors
    }
}

export {ApiError}