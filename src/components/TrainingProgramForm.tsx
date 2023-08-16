'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
interface IFormData {
  age: number | '';
  sex: string;
  weight: number | '';
  height: number | '';
  favoriteSport: string;
  generalGoal: string;
  preparationPeriod: number | '';
  sessionsPerWeek: number | '';
  startDate: string;
  trainingDays: string[];
  maxSessionDuration: number | '';
}

const TrainingProgramForm = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trainingDays, setTrainingDays] = useState<string[] | []>([]);

  const [formData, setFormData] = useState<IFormData>({
    age: '',
    sex: '',
    weight: '',
    height: '',
    favoriteSport: '',
    generalGoal: '',
    preparationPeriod: '',
    sessionsPerWeek: '',
    startDate: '',
    trainingDays: trainingDays,
    maxSessionDuration: '',
  });
  const [response, setResponse] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.trainingDays);
  };

  const dataModel = [
    {
      date: 'date of training',
      workout: 'Course à pied - 30 minutes à un rythme confortable',
    },
    {
      date: 'date of training',
      workout: 'Course à pied - 30 minutes à un rythme confortable',
    },
  ];

  const fetchOpenAIChat = async () => {
    const prompt = `I want you to help to make a sport program that i will use in a app developped in JS react. to  Here are the details to evaluate your training program. I am ${
      formData.age
    }, my Sex is ${formData.sex},my Weight: ${formData.weight},my Height: ${
      formData.height
    }, my Favorite Sport: ${formData.favoriteSport}, my General Goal: ${
      formData.generalGoal
    }, the Preparation Duration i want is ${
      formData.preparationPeriod
    } with Sessions ${formData.sessionsPerWeek}  per Week. The Start Date: ${
      formData.startDate
    }. my days of  Training  in a Week are: ${formData.trainingDays.forEach(
      (d) => {
        return d;
      }
    )} the Maximum Session Duration: ${
      formData.maxSessionDuration
    }. Please generate a workout program based on these details, you will generate a json file with the following structure:${dataModel}, where each object represents a day of the week and the workout to do. Please make sure that the workout is adapted to my level of fitness and that it is not too difficult. Please generate all the workouts for the next ${
      formData.preparationPeriod
    } weeks from the ${formData.startDate}.`;

    try {
      setLoading(true);
      const url = 'https://api.openai.com/v1/chat/completions';
      const bearer = 'Bearer ' + process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      fetch(url, {
        method: 'POST',
        headers: {
          Authorization: bearer,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      })
        .then((response) => {
          console.log(response);

          return response.json();
        })
        .then((data) => {
          setResponse(data.choices[0].message.content);
          setLoading(false);
        });
    } catch (err: any) {
      setError(`Fetch request error: ${err.message}`);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    fetchOpenAIChat();
    console.log(formData);
  };

  const changeTrainingDays = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const tab = [...trainingDays];
      tab.push(e.target.value);
      setTrainingDays(tab);
      console.log(trainingDays);
    } else {
      setTrainingDays(trainingDays.filter((day) => day !== e.target.value));
      console.log(trainingDays);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <p className='text-red-500'>{error}</p>}
        <div className='mb-2'>
          <label>Age: </label>
          <input
            className='text-black'
            type='number'
            name='age'
            onChange={handleChange}
          />
        </div>
        <div className='mb-2'>
          <label>Sex: </label>
          <select className='text-black' name='sex' onChange={handleChange}>
            <option value=''>Select...</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>
        <div className='mb-2'>
          <label>Weight (kg): </label>
          <input
            className='text-black'
            type='number'
            name='weight'
            onChange={handleChange}
          />
        </div>
        <div className='mb-2'>
          <label>Height (cm): </label>
          <input
            className='text-black'
            type='number'
            name='height'
            onChange={handleChange}
          />
        </div>
        <div className='mb-2'>
          <label>Most Practiced Sport: </label>
          <input
            className='text-black'
            type='text'
            name='favoriteSport'
            onChange={handleChange}
          />
        </div>
        <div className='mb-2 flex'>
          <label>General Goal: </label>
          <textarea
            className='ml-2 text-black'
            name='generalGoal'
            onChange={handleChange}
          />
        </div>
        <div className='mb-2'>
          <label>Preparation Duration (8 to 24 weeks): </label>
          <input
            className='text-black'
            type='number'
            min='8'
            max='24'
            name='preparationPeriod'
            onChange={handleChange}
          />
        </div>
        <div className='mb-2'>
          <label>Sessions per Week: </label>
          <input
            className='text-black'
            type='number'
            name='sessionsPerWeek'
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Start Date: </label>
          <input
            className='text-black'
            type='date'
            name='startDate'
            onChange={handleChange}
          />
        </div>
        <div className='flex-col'>
          <div>
            <label>Training Days in a Week: </label>
          </div>
          <span>Lundi</span>
          <input
            className='ml-1 mr-4'
            type='checkbox'
            name='trainingDays'
            onChange={changeTrainingDays}
            value={'monday'}
          />
          <span>Mardi</span>
          <input
            className='ml-1 mr-4'
            type='checkbox'
            name='trainingDays'
            onChange={changeTrainingDays}
            value={'tuesday'}
          />
          <span>Mercredi</span>
          <input
            className='ml-1 mr-4'
            type='checkbox'
            name='trainingDays'
            onChange={changeTrainingDays}
            value={'wednesday'}
          />
          <span>Jeudi</span>
          <input
            className='ml-1 mr-4'
            type='checkbox'
            name='trainingDays'
            onChange={changeTrainingDays}
            value={'thursday'}
          />
          <span>Vendredi</span>
          <input
            className='ml-1 mr-4'
            type='checkbox'
            name='trainingDays'
            onChange={changeTrainingDays}
            value={'friday'}
          />
          <span>Samedi</span>
          <input
            className='ml-1 mr-4'
            type='checkbox'
            name='trainingDays'
            onChange={changeTrainingDays}
            value={'saturday'}
          />
          <span>Dimanche</span>
          <input
            className='ml-1 mr-4'
            type='checkbox'
            name='trainingDays'
            onChange={changeTrainingDays}
            value={'sunday'}
          />
        </div>
        <div className='mb-2'>
          <label>Maximum Session Duration (minutes): </label>
          <input
            className='text-black'
            type='number'
            name='maxSessionDuration'
            onChange={handleChange}
          />
        </div>
        <div className='mb-2'>
          <input type='submit' value='Submit' />
        </div>
      </form>
      {loading && (
        <div className='flex justify-center text-white'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white-900'></div>
        </div>
      )}
      {!loading && response && (
        <div className='flex justify-center'>
          <p className='text-white'>{response}</p>
        </div>
      )}
    </>
  );
};
export default TrainingProgramForm;
