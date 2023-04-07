from datetime import datetime as dt
from datetime import timedelta



ca_breaks = list()
sa_breaks = list()
all_break_dicts = list()
all_break_objs = list()

idCount = 0


class team_member:

    # No need to calculate all breaks at once just the next one for each person

    def __init__(self, name='', time_in='', time_out='', lanes=True, nb=None):
        self.generateID()
        self.name = name
        self.time_in = time_in
        self.time_out = time_out
        self.breaks_taken = 0
        self.lanes = lanes
        self.time_returned = time_in

        hrs = dt.strptime(time_out, "%I:%M %p") - dt.strptime(time_in, "%I:%M %p")
        self.hours = float(hrs.seconds/60/60)
        self.hours_left = self.hours

        if self.hours < 6:
            self.breaks_needed = 1
            self.need_lunch = False
        elif self.hours >= 6 and 6.5 >= self.hours:
            self.breaks_needed = 2
            self.need_lunch = True
        else:
            self.breaks_needed = 3
            self.need_lunch = True

        if nb is None:
            self.next_break()

        print(f'object created {self.__dict__} \n\n\n')

    def generateID(self):
        global idCount

        self.id = idCount

        idCount = idCount + 1

    def next_break(self):

        if self.breaks_taken == self.breaks_needed:

            print('max breaks reached')
            
            print(f'self {[self]}')
            print(f'Before removal: {all_break_objs}')
            if self in all_break_objs:
                all_break_objs.remove(self)
                print('removing')
                
            print(f'After removal {all_break_objs}')
            combine_n_sort()
            return

            

        tr = dt.strptime(self.time_returned, "%I:%M %p")

        till_nb = self.hours_left / \
            (self.breaks_needed - self.breaks_taken + 1)

        # check if its lunch or 15
        if self.breaks_taken == 1 and self.need_lunch:
            nb_start = tr + timedelta(hours=till_nb) - timedelta(minutes=15)
            nb_end = tr + timedelta(hours=till_nb) + timedelta(minutes=15)
            self.need_lunch = False
        else:
            nb_start = tr + timedelta(hours=till_nb) - timedelta(minutes=7.5)
            nb_end = tr + timedelta(hours=till_nb) + timedelta(minutes=7.5)

        nb_start = round(nb_start)
        nb_end = round(nb_end)

        break_tupp = (dt.strftime(nb_start, "%I:%M %p"),
                      dt.strftime(nb_end, "%I:%M %p"))

        self.nb = break_tupp

        if self.lanes:
            compare(self, ca_breaks)
        else:
            compare(self, sa_breaks)

        combine_n_sort()

    def take_break(self):

        print(f'inside taking break function for {self.name} ({[self]})')
        self.time_returned = self.nb[1]

        self.breaks_taken = self.breaks_taken + 1

        hrs = dt.strptime(self.time_out, "%I:%M %p") - \
            dt.strptime(self.time_returned, "%I:%M %p")
        self.hours_left = float(hrs.seconds/60/60)

        if self.lanes:
            bl = ca_breaks
        else:
            bl = sa_breaks

        for i in range(0, len(bl)):
            if self.id == bl[i-1].id:
                print(f'{[bl[i-1]]} should equal {[self]}')
                bl.pop(i-1)

    def __str__(self):
        return f"ID: {self.id}\nName: {self.name}\nTime In: {self.time_in}\nTime Out:{self.time_out}\nHours: {self.hours}\n\nBreaks Needed: {self.breaks_needed}\nBreaks Taken: {self.breaks_taken}\nhours left:{self.hours_left}\n\n\n"


def quick_sort(list_of_dicts):
    print('quick soarting')
    breaks = []
    length = len(list_of_dicts)
    if length <= 1:
        return (list_of_dicts)
    else:
        last_dict = list_of_dicts.pop()

        pivot = last_dict.nb[0]
        strp_pivot = dt.strptime(last_dict.nb[0], "%I:%M %p")

    items_greater = []
    items_lower = []

    for dict in list_of_dicts:
        if dt.strptime(dict.nb[0], "%I:%M %p") > strp_pivot:
            items_greater.append(dict)
        else:
            items_lower.append(dict)

        piv_list = []
        piv_list.append(last_dict)

    # print(f'Printing list of lastdict: {last_dict}')
    return quick_sort(items_lower) + piv_list + quick_sort(items_greater)


def round(t):
    # print('rounding')
    # print(t)
    t = t - timedelta(seconds=(t.second))
    # print(t)
    remainder = (t.minute) % 5
    difference = 5 - remainder
    #print(f'dif: {difference}')

    if difference >= 5:
        return (t)
    elif difference >= 2.5:
        return (t + timedelta(minutes=difference))
    else:
        return (t - timedelta(minutes=difference))


def compare(new_b, break_list):
    # Compare the values being added with the tupple in the correct dict.
    # if there is overlap, shift values around (5 min intervles right and left alternating)
    # if there is a shift we need to make sure it didnt mess with the other breaks
    # for loop nested within a while loop while shifted: for...
    # after this we need to merge and sort our lists

    # if the list doesnt have any break dicts in it: append
    # else compare the current break with all values in the list.
    # if overlap: call overlap function wich will return re arrange the list: then break out of the loop.
    print('Comparing and fixing')
    ol = False
    b_start = new_b.nb[0]
    b_end = new_b.nb[1]

    count = 0

    if len(break_list) > 0:
        for b in break_list:

            if b.nb[0] <= b_start and b_start < b.nb[1] or b.nb[0] < b_end and b_end <= b.nb[1]:
                print(
                    f"We have an overlap between {b.name}:{b.nb}  and {new_b.name}: {new_b.nb} ")
                ol = True
                print(f'popping {break_list.pop(count).name}')
                print(break_list)
                # break_list.pop(count)
                overlap(break_list, b, new_b, 0)
                break
            count = count + 1

        if not ol:
            print(f'no ol so appending {new_b.name}')
            break_list.append(new_b)

    else:
        print(f'appending first item {new_b.name}')
        break_list.append(new_b)


def overlap(bl, ol1, ol2, recur):

    global new_ol1_tupp, new_ol2_tupp
    print("in overlap function")
    print(ol1.nb)
    print(ol2.nb)

    ol1_start = dt.strptime(ol1.nb[0], "%I:%M %p")
    ol1_end = dt.strptime(ol1.nb[1], "%I:%M %p")

    ol2_start = dt.strptime(ol2.nb[0], "%I:%M %p")
    ol2_end = dt.strptime(ol2.nb[1], "%I:%M %p")

    while ol1_start <= ol2_start and ol2_start < ol1_end or ol1_start < ol2_end and ol2_end <= ol1_end:
        print('Fixing overlap')
        if ol1_start <= ol2_start:
            # ol1 moves <------ and
            # ol2 moves ---->
            if recur % 2 == 0:
                ol1_start = ol1_start - timedelta(minutes=5)
                ol1_end = ol1_end - timedelta(minutes=5)
            else:
                ol2_start = ol2_start + timedelta(minutes=5)
                ol2_end = ol2_end + timedelta(minutes=5)

        else:
            # can I pop the dict that im editiing or will i need to use an index for the second overlap
            if recur % 2 == 0:
                ol1_start = ol1_start + timedelta(minutes=5)
                ol1_end = ol1_end + timedelta(minutes=5)

            else:
                ol2_start = ol2_start - timedelta(minutes=5)
                ol2_end = ol2_end - timedelta(minutes=5)

        recur = recur + 1

        new_ol1_tupp = (dt.strftime(ol1_start, "%I:%M %p"),
                        dt.strftime(ol1_end, "%I:%M %p"))
        new_ol2_tupp = (dt.strftime(ol2_start, "%I:%M %p"),
                        dt.strftime(ol2_end, "%I:%M %p"))

        print(f'new tupp: {new_ol1_tupp}')
        print(f'new tupp: {new_ol2_tupp}')

    ol1.nb = new_ol1_tupp
    ol2.nb = new_ol2_tupp

    print(ol1.nb)
    print(ol2.nb)
    compare(ol1, bl)
    compare(ol2, bl)

    print()
    print(f"new list{bl}")


def print_list(b):
    # os.system('clear')
    for p in b:
        print(f'Name:{p.name}\tNext Break{p.nb}')


def combine_n_sort():
    global all_break_objs
    global all_break_dicts

    all_break_objs = sa_breaks + ca_breaks

    if len(all_break_dicts) > 0:
        all_break_dicts.clear()

    all_break_objs = quick_sort(all_break_objs)
    for obj in all_break_objs:
        all_break_dicts.append(obj.__dict__)


# ------------------------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------


def loadDefaults():
    all_break_dicts.clear()
    all_break_objs.clear()
    ca_breaks.clear()
    sa_breaks.clear()

    jake = team_member('Jake', '10:00 AM', '8:00 PM', False)
    kyle = team_member('Kyle', '10:00 AM', '8:00 PM', False)
    marco = team_member('Marco', '10:00 AM', '8:00 PM', False)
    kaya = team_member('Kaya', '9:00 AM', '4:00 PM', True)
    loucks = team_member('Loucks', '10:00 AM', '3:00 PM', False)

def addTM(name, timeIn, timeOut, lanes):
    tempTM = team_member(name, timeIn, timeOut, lanes)
