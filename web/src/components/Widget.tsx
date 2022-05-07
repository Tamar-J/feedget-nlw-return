import { ChatTeardropDots } from 'phosphor-react';
import { Popover } from '@headlessui/react';
import WidgetForm from './WidgetForm';

export default function Widget() {
    return (
        <Popover className='absolute bottom-5 right-5 flex flex-col items-end md:bottom-8 md:right-8'>
            <Popover.Panel>
                <WidgetForm />
            </Popover.Panel>
            <Popover.Button className='flex items-center bg-violet-500 rounded-full px-3 h-12 text-white group'>
                <ChatTeardropDots className='w-6 h-6'/>
                <span className='max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear'>
                    <span className='pl-2'>Feedback</span>
                </span>
            </Popover.Button>
        </Popover>

    )
}