export function TaskForm(){

    const handleSubmit = (e) =>{
        e.preventDefalt();
        console.log(e.target.title.value)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" />
            <button>Add</button>
        </form>
    );
}