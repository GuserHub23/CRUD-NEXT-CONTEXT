import Layout from "../components/Layout";
import { useTasks } from "../context/taskContext";
import { VscTrash } from 'react-icons/vsc'
import { useRouter } from "next/router";

const Home = () => {

  const { tasks, deleteTask } = useTasks();
  const { push }= useRouter()

  return (
      <Layout>
        <div className='flex justify-center'>
        {
          tasks.length === 0 ?
          (<h2>There are no Tasks...</h2>)
          : (
            <div className='w-7/12'>
              {
                tasks.map((task,index) => (
                  <div 
                    className="bg-gray-600 hover:bg-gray-500 cursor-pointer px-20 py-5 m-2 flex justify-start items-center"
                    onClick={() => push(`/edit/${tasks.id}`)}
                    key={task.id}
                  >
                    <span className='text-5xl mr-5' >{index}</span>
                    <div className='w-full'>
                      <div className='flex justify-between'>
                        <h1 className='font-bold'>{task.title}</h1>
                        
                        <button 
                          className='bg-red-700 hover:bg-red-600 py-1 px-3 rounded-sm inline-flex items-center'
                          onClick={ e => {
                            e.stopPropagation();
                            deleteTask(task.id);
                          }}
                        >
                          <VscTrash className='mr-2'/>
                          Delete
                        </button>
                      </div>
                      <p className='text-gray-300'>{task.description}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
        </div>
      </Layout>
  );
}

export default Home;