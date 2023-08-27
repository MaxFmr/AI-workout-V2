'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

interface IFormData {
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
  };

  const fetchOpenAIChat = async () => {
    const prompt = `en suivant ce model de data en exemple { "date": "2023-09-01", "workout": "Course à pied - 30 minutes à un rythme confortable"
    }, peux tu me générer un fichier json ou chaque objet est un jour d'entrainement, avec ${formData.sessionsPerWeek} jours d'entrainement par semaine, avec un début ${formData.startDate}. Je doit avoir ces types de sports ${formData.favoriteSport}. l'objectif est ${formData.generalGoal}.le programme va durer ${formData.preparationPeriod} semaines. chaque séance ne peut excéder ${formData.maxSessionDuration} minutes. Les jours d'entrainement de la semaine seront ${formData.trainingDays} génère moi un json avec ces données, veille à ce que les séances soient variées et que les jours d'entrainement soient respectés. Donnes moi l'etiereté du programme en json`;
    console.log(prompt);

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
    console.log('response', response);
  };

  const serialize = (response: string) => {
    const body = { text: response };

    fetch('/serial', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body), // add 'as BodyInit' to explicitly specify the type
    });
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
          <label>Vos sports préférés : </label>
          <input
            className='text-black'
            type='text'
            name='favoriteSport'
            onChange={handleChange}
          />
        </div>
        <div className='mb-2 flex'>
          <label>Votre objectif, chiffré ou non: </label>
          <textarea
            className='ml-2 text-black'
            name='generalGoal'
            onChange={handleChange}
          />
        </div>
        <div className='mb-2'>
          <label>Durée du programme (8 à 24 semaines): </label>
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
          <label>Nombre de séances par semaine </label>
          <input
            className='text-black'
            type='number'
            name='sessionsPerWeek'
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date de début : </label>
          <input
            className='text-black'
            type='date'
            name='startDate'
            onChange={handleChange}
          />
        </div>
        <div className='flex-col'>
          <div>
            <label>Vos jours d’entrainement dans la semaine: </label>
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
          <label>Durée maximale d’une séance (minutes): </label>
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
        <div className='flex ml-10 text-white max-w-[100vw]'>
          <pre className='text-white'>
            <code>{response}</code>
          </pre>
          <button
            className='ml-10'
            onClick={() => {
              serialize(response);
            }}>
            Serialize
          </button>
        </div>
      )}
    </>
  );
};
export default TrainingProgramForm;
