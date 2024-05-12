import 'package:flutter/material.dart';

class InfoContainer extends StatelessWidget {
  const InfoContainer({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(
        left: 16,
        right: 16,
        top: 16,
        bottom: 36,
      ),
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(25),
          color: const Color(0xff266a61),
          gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                const Color(0xff266a61),
                const Color(0xff266a61).withOpacity(0.45),
              ])),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Icon(
                    Icons.menu,
                    color: Colors.white,
                    size: 14,
                  ),
                  const SizedBox(
                    width: 16,
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'good evening,',
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.white.withOpacity(0.5),
                        ),
                      ),
                      const SizedBox(
                        height: 4,
                      ),
                      const Text(
                        'Catalysts',
                        style: TextStyle(
                          fontSize: 16,
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              const Icon(
                Icons.notifications,
                color: Colors.white,
                size: 18,
              )
            ],
          ),
          const SizedBox(
            height: 56,
          ),
          const Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'your total balance',
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.white,
                ),
              ),
              Icon(
                Icons.remove_red_eye_outlined,
                size: 24,
                color: Colors.white,
              )
            ],
          ),
          const SizedBox(
            height: 4,
          ),
          const Text(
            '\$5465465',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 28,
              color: Colors.white,
            ),
          ),
          const SizedBox(
            height: 24,
          ),
          Row(
            children: [
              Expanded(
                child: Container(
                  alignment: Alignment.center,
                  padding: const EdgeInsets.symmetric(
                    vertical: 24,
                  ),
                  decoration: BoxDecoration(
                      color: const Color(0xff0f0f0f),
                      borderRadius: BorderRadius.circular(25)),
                  child: const Text(
                    'request',
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
              const SizedBox(
                width: 8,
              ),
              Expanded(
                child: Container(
                  alignment: Alignment.center,
                  padding: const EdgeInsets.symmetric(
                    vertical: 24,
                  ),
                  decoration: BoxDecoration(
                      color: const Color(0xffffffff),
                      borderRadius: BorderRadius.circular(25)),
                  child: const Text(
                    'send',
                    style: TextStyle(
                      fontSize: 12,
                      color: Color(0xff0f0f0f0f),
                    ),
                  ),
                ),
              )
            ],
          )
        ],
      ),
    );
  }
}
